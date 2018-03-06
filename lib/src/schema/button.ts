import { SFRenderSchema } from './render';
import { SFActiveSchema } from './active';

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

    /**
     * 是否需要确认框
     */
    popconfirm?: boolean;

    /**
     * 确认框标题
     */
    poptitle?: string;
}
