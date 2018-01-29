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
