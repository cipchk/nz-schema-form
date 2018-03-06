/** 错误类型 */
export type ERROR =
    'INVALID_TYPE' | 'INVALID_FORMAT' | 'ENUM_MISMATCH' | 'ANY_OF_MISSING' | 'ONE_OF_MISSING' | 'ONE_OF_MULTIPLE' | 'NOT_PASSED' |
    'ARRAY_LENGTH_SHORT' | 'ARRAY_LENGTH_LONG' | 'ARRAY_UNIQUE' | 'ARRAY_ADDITIONAL_ITEMS' |
    'MULTIPLE_OF' | 'MINIMUM' | 'MINIMUM_EXCLUSIVE' | 'MAXIMUM' | 'MAXIMUM_EXCLUSIVE' |
    'OBJECT_PROPERTIES_MINIMUM' | 'OBJECT_PROPERTIES_MAXIMUM' | 'OBJECT_MISSING_REQUIRED_PROPERTY' | 'OBJECT_ADDITIONAL_PROPERTIES' | 'OBJECT_DEPENDENCY_KEY' |
    'MIN_LENGTH' | 'MAX_LENGTH' | 'PATTERN' |
    'KEYWORD_TYPE_EXPECTED' | 'KEYWORD_UNDEFINED_STRICT' | 'KEYWORD_UNEXPECTED' | 'KEYWORD_MUST_BE' | 'KEYWORD_DEPENDENCY' | 'KEYWORD_PATTERN' | 'KEYWORD_VALUE_TYPE' | 'UNKNOWN_FORMAT' | 'CUSTOM_MODE_FORCE_PROPERTIES' |
    'REF_UNRESOLVED' | 'UNRESOLVABLE_REFERENCE' | 'SCHEMA_NOT_REACHABLE' | 'SCHEMA_TYPE_EXPECTED' | 'SCHEMA_NOT_AN_OBJECT' | 'ASYNC_TIMEOUT' | 'PARENT_SCHEMA_VALIDATION_FAILED' | 'REMOTE_NOT_VALID'
;

export interface ErrorData {
    [key: string]: any;
    title?: string;
    params?: any[];
    code: string;
    path?: string;
    description?: string;
    message?: string;
}

export interface ErrorSchema {
    /**
     * 自定义错误信息
     */
    errors?: { [ key: string ]: string | ((obj: ErrorData) => string) };
    /**
     * 是否只展示错误视觉不显示错误文本，默认：`false`
     */
    onlyVisual?: boolean;
}

export const ERRORSDEFAULT = {
    INVALID_FORMAT:                     `{title}格式不正确`,
    MIN_LENGTH:                         `至少{param.1}个字符以上`,
    MAX_LENGTH:                         `至多{param.1}个字符`,
    PATTERN:                            `{title}格式不匹配`,
    OBJECT_MISSING_REQUIRED_PROPERTY:   `必填项`,
    MINIMUM:                            `必须大于{param.1}及以上`,
    MINIMUM_EXCLUSIVE:                  `必须大于{param.1}以上`,
    MAXIMUM:                            `必须小于{param.1}以下`,
    MAXIMUM_EXCLUSIVE:                  `必须小于{param.1}以下`
};
