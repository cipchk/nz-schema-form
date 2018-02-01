import { NzWidgetRegistry } from 'nz-schema-form';
import { TinymceWidget } from 'nz-schema-form/src/widgets-third/tinymce/tinymce.widget';
import { UEditorWidget } from 'nz-schema-form/src/widgets-third/ueditor/ueditor.widget';

export class MyWidgetRegistry extends NzWidgetRegistry {
    constructor() {
        super();

        this.register(TinymceWidget.KEY,  TinymceWidget);
        this.register(UEditorWidget.KEY,  UEditorWidget);
    }
}
