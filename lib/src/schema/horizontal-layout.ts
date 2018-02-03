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

    /**
     * `label` 固定宽度
     * - 限 `horizontal` 水平布局有效
     */
    span_label_fixed?: number;
}
