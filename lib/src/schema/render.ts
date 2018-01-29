import { SFGrid } from './grid';

export interface SFRenderSchema {
    /**
     * 自定义类，等同 `[ngClass]` 值
     */
    class?: string | string[];
    /**
     * 自定义样式，等同 `[ngStyle]` 值
     */
    style?: { [key: string]: string };
    /**
     * 响应式属性
     */
    grid?: SFGrid;
}
