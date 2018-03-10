import { Inject } from '@angular/core';
import { FormProperty, PropertyGroup } from './formproperty';
import { NumberProperty } from './numberproperty';
import { StringProperty } from './stringproperty';
import { BooleanProperty } from './booleanproperty';
import { ObjectProperty } from './objectproperty';
import { ArrayProperty } from './arrayproperty';
import { SchemaValidatorFactory } from '../schema.validator.factory';
import { ValidatorRegistry } from './validatorregistry';
import { SchemaFormOptions } from '../schema-form.options';

export class FormPropertyFactory {
    constructor(
        private schemaValidatorFactory: SchemaValidatorFactory,
        private validatorRegistry: ValidatorRegistry,
        private options: SchemaFormOptions
    ) {}

    createProperty(schema: any, parent: PropertyGroup = null, propertyId?: string): FormProperty {
        let newProperty = null;
        let path = '';
        if (parent) {
            path += parent.path;
            if (parent.parent !== null) {
                path += '/';
            }
            if (parent.type === 'object') {
                path += propertyId;
            } else if (parent.type === 'array') {
                path += '*';
            } else {
                throw new Error('Instanciation of a FormProperty with an unknown parent type: ' + parent.type);
            }
        } else {
            path = '/';
        }

        if (schema.$ref) {
            const refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
            newProperty = this.createProperty(refSchema, parent, path);
        } else {
            switch (schema.type) {
                case 'integer':
                case 'number':
                    newProperty = new NumberProperty(this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path, this.options);
                    break;
                case 'string':
                    newProperty = new StringProperty(this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path, this.options);
                    break;
                case 'boolean':
                    newProperty = new BooleanProperty(this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path, this.options);
                    break;
                case 'object':
                    newProperty = new ObjectProperty(this, this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path, this.options);
                    break;
                case 'array':
                    newProperty = new ArrayProperty(this, this.schemaValidatorFactory, this.validatorRegistry, schema, parent, path, this.options);
                    break;
                default:
                    throw new TypeError(`Undefined type ${schema.type}`);
            }
        }

        if (newProperty instanceof PropertyGroup) {
            this.initializeRoot(newProperty);
        }

        return newProperty;
    }

    private initializeRoot(rootProperty: PropertyGroup) {
        rootProperty._reset(null, true);
        rootProperty._bindVisibility();
    }
}
