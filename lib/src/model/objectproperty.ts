import { PropertyGroup } from './formproperty';
import { FormPropertyFactory } from './formpropertyfactory';
import { SchemaValidatorFactory } from '../schema.validator.factory';
import { ValidatorRegistry } from './validatorregistry';
import { SchemaFormOptions } from '../schema-form.options';

export class ObjectProperty extends PropertyGroup {
    private propertiesId: string[] = [];

    constructor(
        private formPropertyFactory: FormPropertyFactory,
        schemaValidatorFactory: SchemaValidatorFactory,
        validatorRegistry: ValidatorRegistry,
        schema: any,
        parent: PropertyGroup,
        path: string,
        options: SchemaFormOptions
    ) {
        super(schemaValidatorFactory, validatorRegistry, schema, parent, path, options);
        this.createProperties();
    }

    setValue(value: any, onlySelf: boolean) {
        for (const propertyId in value) {
            if (value.hasOwnProperty(propertyId)) {
                this.properties[propertyId].setValue(value[propertyId], true);
            }
        }
        this.updateValueAndValidity(onlySelf, true);
    }

    _reset(value: any, onlySelf = true) {
        value = value || this.schema.default || {};
        this.resetProperties(value);
        this.updateValueAndValidity(onlySelf, true);
    }

    resetProperties(value: any) {
        for (const propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                this.properties[propertyId]._reset(value[propertyId], true);
            }
        }
    }

    createProperties() {
        this.properties = {};
        this.propertiesId = [];
        for (const propertyId in this.schema.properties) {
            if (this.schema.properties.hasOwnProperty(propertyId)) {
                const propertySchema = this.schema.properties[propertyId];
                this.properties[propertyId] = this.formPropertyFactory.createProperty(propertySchema, this, propertyId);
                this.propertiesId.push(propertyId);
            }
        }
    }

    _hasValue(): boolean {
        return !!Object.keys(this.value).length;
    }

    _updateValue() {
        this.reduceValue();
    }

    _runValidation() {
        super._runValidation();

        if (this._errors) {
            this._errors.forEach((error: any) => {
                const prop = this.searchProperty(error.path.slice(1));
                if (prop) {
                    prop.extendErrors(error);
                }
            });
        }
    }

    private reduceValue(): void {
        const value: any = {};
        this.forEachChild((property: any, propertyId: string) => {
            if (property.visible && property._hasValue()) {
                value[propertyId] = property.value;
            }
        });
        this._value = value;
    }
}
