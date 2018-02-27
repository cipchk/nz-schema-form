import { NzWidgetRegistry } from 'nz-schema-form';
import { TinymceWidget } from '../../widgets-third/tinymce/tinymce.widget';
import { UEditorWidget } from '../../widgets-third/ueditor/ueditor.widget';

export const THIRD_COMPONENTS = [
    TinymceWidget,
    UEditorWidget
];

export class MyWidgetRegistry extends NzWidgetRegistry {
    constructor() {
        super();

        this.register(TinymceWidget.KEY,  TinymceWidget);
        this.register(UEditorWidget.KEY,  UEditorWidget);
    }
}
