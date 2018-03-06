import { FormProperty, PropertyGroup } from './formproperty';

import {
  ZSchemaValidatorFactory
} from '../schema.validator.factory';

import { ValidatorRegistry } from './validatorregistry';

class FormPropertyImpl extends FormProperty {

  fallbackValue() {
    return Symbol();
  }
  _updateValue() {}
  setValue() {}
  _reset() {}
  _hasValue() {return true; }
}

class PropertyGroupImpl extends PropertyGroup {

  _updateValue() {}
  setValue() {}
  _hasValue() {return true; }

  _reset() {}
}

describe('FormProperty', () => {
  const THE_SCHEMA_VALIDATOR_FACTORY =  new ZSchemaValidatorFactory(null);
  const THE_VALIDATOR_REGISTRY = new ValidatorRegistry();
  const THE_PROPERTY_SCHEMA = {};
  const THE_PARENT_PROPERTY_SCHEMA = {};
  let THE_VALIDATOR;

  let formProperty: FormProperty;
  let propertyGroup: PropertyGroup;

  beforeEach(() => {
    THE_VALIDATOR = jasmine.createSpy('a_validator');
    spyOn(THE_SCHEMA_VALIDATOR_FACTORY, 'createValidatorFn').and.returnValue(THE_VALIDATOR);

    propertyGroup = new PropertyGroupImpl(
      THE_SCHEMA_VALIDATOR_FACTORY,
      THE_VALIDATOR_REGISTRY,
      THE_PARENT_PROPERTY_SCHEMA,
      null,
      '',
      {}
    );
    spyOn(propertyGroup, 'updateValueAndValidity');
    formProperty = new FormPropertyImpl(
      THE_SCHEMA_VALIDATOR_FACTORY,
      THE_VALIDATOR_REGISTRY,
      THE_PROPERTY_SCHEMA,
      propertyGroup,
      '',
      {}
    );
  });

  it('should create a validator on construction', () => {
    expect(THE_SCHEMA_VALIDATOR_FACTORY.createValidatorFn).toHaveBeenCalledWith(THE_PROPERTY_SCHEMA);
  });

  it('should validate using the validator created on construction', () => {

    formProperty._runValidation();

    expect(THE_VALIDATOR).toHaveBeenCalled();

  });

  describe('With a parent', () => {

    it('should notify parent when changed', () => {
      formProperty.updateValueAndValidity();

      expect(propertyGroup.updateValueAndValidity).toHaveBeenCalled();
    });

  });

  describe('Without a parent', () => {

    it('should not throw when changed', () => {
      const orphanFormProperty = new FormPropertyImpl(
        THE_SCHEMA_VALIDATOR_FACTORY,
        THE_VALIDATOR_REGISTRY,
        THE_PROPERTY_SCHEMA,
        propertyGroup,
        '',
        {}
      );
      const updateValue = (() => { orphanFormProperty.updateValueAndValidity(); });

      expect(updateValue).not.toThrow();
    });

  });



});
