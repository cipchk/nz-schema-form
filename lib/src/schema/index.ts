import { ErrorSchema } from './errors';
import { SFHorizontalLayoutSchema } from './horizontal-layout';
import { SFRenderSchema } from './render';
import { SFActiveSchema } from './active';
import { SFButton } from './button';
import { WidgetData } from './types';

export * from './types';

export interface SFSchema extends ErrorSchema, SFHorizontalLayoutSchema, SFRenderSchema, SFActiveSchema {
    ////////////任何实例类型/////////////
    /**
     * 调试模式
     */
    debug?: boolean;
    /**
     * 数据类型，支持 JavaScript 基础类型；注意项：
     *
     * - JSON 中 `date` 等同 `string` 类型
     * - 指定 `format` 标准参数可以自动适配渲染小部件
     * - 指定 `widget` 参数强制渲染小部件
     */
    type?: 'number' | 'string' | 'boolean' | 'object' | 'array';
    /**
     * 枚举
     */
    enum?: any[];
    ////////////数值类型/////////////
    /**
     * 最小值
     *
     * 一般用于类型 `number` `slider`
     */
    minimum?: number;
    /**
     * 约束是否包括 `minimum` 值
     *
     * 一般用于类型 `number` `slider`
     */
    exclusiveMinimum?: boolean;
    /**
     * 最大值
     *
     * 一般用于类型 `number` `slider`
     */
    maximum?: number;
    /**
     * 约束是否包括 `maximum` 值
     *
     * 一般用于类型 `number` `slider`
     */
    exclusiveMaximum?: boolean;
    /**
     * 倍数
     *
     * 一般用于类型 `number` `slider`
     */
    multipleOf?: number;
    ////////////字符串类型/////////////
    /**
     * 定义字符串的最大长度
     *
     * 一般用于类型 `string` `text`
     */
    maxLength?: number;
    /**
     * 定义字符串的最小长度
     *
     * 一般用于类型 `string` `text`
     */
    minLength?: number;
    /**
     * 验证输入字段正则表达式字符串
     */
    pattern?: string;
    ////////////数组类型/////////////
    /**
     * 元素的类型描述
     */
    items?: SFSchema;
    /**
     * 约束数组最小的元素个数
     *
     * 限 `type=array` 时有效
     */
    minItems?: number;
    /**
     * 约束数组最大的元素个数
     *
     * 限 `type=array` 时有效
     */
    maxItems?: number;
    /**
     * 约束数组每个元素都不相同
     *
     * 限 `type=array` 时有效
     */
    uniqueItems?: boolean;
    ////////////对象类型/////////////
    /**
     * 最大属性个数，必须是非负整数
     */
    maxProperties?: number;
    /**
     * 最小属性个数，必须是非负整数
     */
    minProperties?: number;
    /**
     * 定义属性
     */
    properties?: { [key: string]: SFSchema };
    /**
     * 必需属性
     */
    required?: string[];
    /**
     * 属性顺序
     */
    order?: string[];
    /**
     * 自定义表单元素组合
     * TODO: ng-zorro-antd 本身并不支持 fieldsets 定义，因此不考虑该字段的实现
     */
    // fieldsets?: SFFieldsetsSchema[];
    ////////////注释类型/////////////
    /**
     * 标题，相当于 `label` 值
     */
    title?: string;
    /**
     * 提示信息
     */
    description?: string;
    /**
     * 是否展示 `description`，默认：`false`
     */
    showDescription?: boolean;
    /**
     * 默认值
     */
    default?: any;
    ////////////其他/////////////
    /**
     * 按钮信息
     */
    button?: SFButton;
    /**
     * 数据格式
     * @see http://json-schema.org/latest/json-schema-validation.html#rfc.section.7.3
     */
    format?: string;
    /**
     * 指定采用什么小部件渲染，所有小部件名可[查阅文档](https://travis-ci.org/cipchk/nz-schema-form)
     */
    widget?: WidgetData | string;
    /**
     * 指定条件时才显示，例如：
     *
     * `visibleIf: { shown: [ true ] }`：当 `shown: true` 时才显示当前属性
     */
    visibleIf?: { [key: string]: any[] }
    /**
     * 值必须是其中之一
     *
     * 一般用于类型 `select`
     */
    oneOf?: SFSchema[];
    /**
     * 是否只读状态
     */
    readOnly?: boolean;
}
