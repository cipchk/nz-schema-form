export interface WidgetData {
    [key: string]: any;

    /**
     * 指定采用什么小部件渲染，所有小部件名可[查阅文档](https://travis-ci.org/cipchk/nz-schema-form)
     */
    id?: string;
    /**
     * 文字框中显示提示信息
     */
    placeholder?: string;
    /**
     * 用于显示表单额外提示信息
     */
    extra?: string;
}
