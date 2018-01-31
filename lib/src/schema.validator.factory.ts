import { Inject, Optional } from '@angular/core';
import * as ZSchema from 'z-schema';
import { SchemaFormOptions, NZ_SF_OPTIONS_TOKEN } from '../schema-form.options';

export abstract class SchemaValidatorFactory {
    abstract createValidatorFn(schema: any): (value: any) => any;

    abstract getSchema(schema: any, ref: any): any;
}

export class ZSchemaValidatorFactory extends SchemaValidatorFactory {
    protected zschema: any;

    constructor(@Optional() @Inject(NZ_SF_OPTIONS_TOKEN) private options: SchemaFormOptions) {
        super();
        this.zschema = new ZSchema((options && options.zSchemaOptions) || {});
    }

    createValidatorFn(schema: any) {
        return (value: any): { [key: string]: boolean } => {
            if (schema.type === 'number' || schema.type === 'integer') {
                value = +value;
            }

            this.zschema.validate(value, schema);
            let err = this.zschema.getLastErrors();
            if (this.options && this.options.ingoreTypeValidator && err) {
                err = (err as any[]).filter(w => w.code !== 'INVALID_TYPE');
            }

            this.denormalizeRequiredPropertyPaths(err);

            return err || null;
        };
    }

    getSchema(schema: any, ref: string) {
        // check definitions are valid
        const isValid = this.zschema.compileSchema(schema);
        if (isValid) {
            return this.getDefinition(schema, ref);
        } else {
            throw this.zschema.getLastError();
        }
    }

    private denormalizeRequiredPropertyPaths(err: any[]) {
        if (err && err.length) {
            err = err.map(error => {
                if (error.path === '#/' && error.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    error.path = `${error.path}${error.params[0]}`;
                }
                return error;
            });
        }
    }

    private getDefinition(schema: any, ref: string) {
        let foundSchema = schema;
        ref
            .split('/')
            .slice(1)
            .forEach(ptr => {
                if (ptr) {
                    foundSchema = foundSchema[ptr];
                }
            });
        return foundSchema;
    }
}
