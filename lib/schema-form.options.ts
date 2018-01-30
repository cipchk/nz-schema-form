import { InjectionToken } from '@angular/core';
import * as ZSchema from 'z-schema';
import { ERROR, ERRORSDEFAULT } from './src/schema/errors';

export const NZ_SF_OPTIONS_TOKEN = new InjectionToken<SchemaFormOptions>('NZ_SF_OPTIONS_TOKEN');
export const NZ_SF_USER_OPTIONS_TOKEN = new InjectionToken<SchemaFormOptions>('NZ_SF_USER_OPTIONS_TOKEN');

export interface SchemaFormOptions {
    [key: string]: any;
    /**
     * z-schema 参数
     * @see https://github.com/zaggino/z-schema
     */
    zSchemaOptions?: ZSchema.Options;
    /**
     * 是否只展示错误视觉不显示错误文本，默认：`false`
     */
    onlyVisual?: boolean;
    /**
     * 是否展示 `description`，默认：`false`
     */
    showDescription?: boolean;
    /**
     * 自定义通用错误信息
     */
    errors?: { [ key: string ]: string }
    /**
     * 日期小部件配置
     */
    date?: any;
}

export const DEFAULT: SchemaFormOptions = {
    errors: ERRORSDEFAULT,
    onlyVisual: false,
    showDescription: false,
    date: {}
};
