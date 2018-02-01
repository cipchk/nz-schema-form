import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-md';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzSchemaFormModule } from 'nz-schema-form';

// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AceEditorModule,
        NgZorroAntdModule,
        NzSchemaFormModule,
        MarkdownModule
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AceEditorModule,
        NgZorroAntdModule,
        NzSchemaFormModule,
        MarkdownModule,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class SharedModule { }
