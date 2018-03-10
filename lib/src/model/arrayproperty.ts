import { FormProperty, PropertyGroup } from './formproperty';
import { FormPropertyFactory } from './formpropertyfactory';
import { SchemaValidatorFactory } from '../schema.validator.factory';
import { ValidatorRegistry } from './validatorregistry';
import { SchemaFormOptions } from '../schema-form.options';

export class ArrayProperty extends PropertyGroup {

  constructor(private formPropertyFactory: FormPropertyFactory,
              schemaValidatorFactory: SchemaValidatorFactory,
              validatorRegistry: ValidatorRegistry,
              schema: any,
              parent: PropertyGroup,
              path: string,
              options: SchemaFormOptions
            ) {
    super(schemaValidatorFactory, validatorRegistry, schema, parent, path, options);
  }

  addItem(value: any = null): FormProperty {
    const newProperty = this.addProperty();
    newProperty._reset(value, false);
    return newProperty;
  }

  private addProperty() {
    const newProperty = this.formPropertyFactory.createProperty(this.schema.items, this);
    (<FormProperty[]>this.properties).push(newProperty);
    return newProperty;
  }

  removeItem(index: number) {
    (<FormProperty[]>this.properties).splice(index, 1);
    this.updateValueAndValidity(false, true);
  }

  setValue(value: any, onlySelf: boolean) {
    this.createProperties();
    this.resetProperties(value);
    this.updateValueAndValidity(onlySelf, true);
  }

  _hasValue(): boolean {
    return true;
  }

  _updateValue() {
    this.reduceValue();
  }

  private reduceValue(): void {
    const value: any[] = [];
    this.forEachChild((property, _) => {
      if (property.visible && property._hasValue()) {
        value.push(property.value);
      }
    });
    this._value = value;
  }

  _reset(value: any, onlySelf = true) {
    value = value || this.schema.default || [];
    this.properties = [];
    this.resetProperties(value);
    this.updateValueAndValidity(onlySelf, true);
  }

  private createProperties() {
    this.properties = [];
  }


  private resetProperties(value: any) {
    for (const idx in value) {
      if (value.hasOwnProperty(idx)) {
        const property = this.addProperty();
        property._reset(value[idx], true);
      }
    }
  }
}
