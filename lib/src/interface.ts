
export interface SFSchema extends SFHorizontalLayoutSchema, SFArraySchema, SFRenderSchema, SFActiveSchema {
    ////////////任何实例类型/////////////
    /**
     * 调试模式
     */
    debug?: boolean;
    /**
     * 类型
     * - **any**: object, array
     * - **string**: string, text, textarea, search, url, email, password, select, radio
     * - **number**: number, integer, range
     * - **boolean**: boolean, checkbox
     * - **date**: date, date-rang, time
     * - **other**: rate, file, cascader, transfer
     */
    type?: string;
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
    exclusiveMinimum?: number;
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
    exclusiveMaximum?: number;
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
     * 默认值
     */
    default?: any;
    /**
     * 文字框中显示提示信息
     */
    placeholder?: string;
    ////////////其他/////////////
    /**
     * 按钮信息
     */
    button?: SFButton;
    /**
     * 指定采用什么小部件渲染
     */
    widget?: string | Object;
    /**
     * 文本格式化
     */
    format?: string;
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
    ////////////渲染（非json schema标准部分）/////////////
    /**
     * 自适应内容高度，可设置为 true|false 或对象：`{ minRows: 2, maxRows: 6 }`
     *
     * 限 `type=textarea` 时有效
     */
    autosize?: boolean | Object;
}

export interface SFHorizontalLayoutSchema {
    /**
     * `label` 栅格占位格数，默认：`5`
     * - `0` 时相当于 `display: none`
     * - 限 `horizontal` 水平布局有效
     */
    span_label?: number;

    /**
     * `control` 栅格占位格数，默认：`19`
     * - `0` 时相当于 `display: none`
     * - 限 `horizontal` 水平布局有效
     */
    span_control?: number;

    /**
     * `control` 栅格左侧的间隔格数，间隔内不可以有栅格
     * - 限 `horizontal` 水平布局有效
     */
    offset_control?: number;
}

export interface SFArraySchema {
    /**
     * 添加按钮文本
     *
     * 限定表格渲染时有效
     */
    addText?: string;
    /**
     * 移除按钮文本
     *
     * 限定表格渲染时有效
     */
    removeText?: string;
}

export interface SFRenderSchema {
    /**
     * 自定义类，等同 `[ngClass]` 值
     */
    class?: string | string[];
    /**
     * 自定义样式，等同 `[ngStyle]` 值
     */
    style?: {[key: string]: string};
    /**
     * 响应式属性
     */
    grid?: SFGrid;
}

export interface SFActiveSchema {
    /**
     * 是否禁用状态
     */
    disabled?: boolean;
    /**
     * 元素组件大小
     * @default 'large'
     */
    size?: 'default' | 'large' | 'small';
}

export interface SFButton extends SFRenderSchema {
    /**
     * 按钮组
     */
    items: SFButtonItem[];
}

export interface SFButtonItem extends SFActiveSchema {
    [key: string]: any;

    id: string;

    /**
     * 按钮文本
     */
    label: string;

    /**
     * 是否提交按钮
     */
    submit?: boolean;

    /**
     * 回调携带参数
     */
    parameters?: any;

    /**
     * 按钮类型
     */
    type?: 'primary' | 'default' | 'dashed' | 'danger';
}

export interface SFGridSize {
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
}

export interface SFGrid {
    /**
     * 栅格间隔
     */
    gutter?: number;
    /**
     * 栅格占位格数，为 `0` 时相当于 `display: none`
     */
    span?: number;
    /**
     * 栅格左侧的间隔格数，间隔内不可以有栅格
     */
    offset?: number;
    xs?: number | SFGridSize;
    sm?: number | SFGridSize;
    md?: number | SFGridSize;
    lg?: number | SFGridSize;
    xl?: number | SFGridSize;
    xxl?: number | SFGridSize;
}

export interface SFFieldsetsSchema {
    title?: string;

    fields: string[];
}
