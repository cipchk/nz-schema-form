import * as ZSchema from 'z-schema';

export class SchemaFormOptions {
    [key: string]: any;
    /**
     * z-schema 参数
     * @see https://github.com/zaggino/z-schema
     */
    zSchemaOptions?: ZSchema.Options;
}
