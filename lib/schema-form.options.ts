import { InjectionToken } from '@angular/core';
import * as ZSchema from 'z-schema';
import { ERROR, ERRORSDEFAULT } from './src/schema/errors';

export const NZ_SF_OPTIONS_TOKEN = new InjectionToken<SchemaFormOptions>('NZ_SF_OPTIONS_TOKEN');
export const NZ_SF_USER_OPTIONS_TOKEN = new InjectionToken<SchemaFormOptions>('NZ_SF_USER_OPTIONS_TOKEN');

export interface SchemaFormOptions {
    [key: string]: any;
    /**
     * 是否忽略数据类型校验，默认：`true`
     *
     * - `false` 限定 Schema 中 `type` 类型，若产生的数据非 `type` 类型会视为错误
     * - `true` 不限定 Schema 中 `type` 类型，若产生的数据非 `type` 类型会视为成功
     */
    ingoreTypeValidator?: boolean;
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

    /**
     * 时间小部件配置
     */
    time?:any
}

export const DEFAULT: SchemaFormOptions = {
    errors: ERRORSDEFAULT,
    ingoreTypeValidator: true,
    onlyVisual: false,
    showDescription: false,
    date: {},
    time: {},
};
