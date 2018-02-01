import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchemaFormOptions, NZ_SF_USER_OPTIONS_TOKEN, NZ_SF_OPTIONS_TOKEN, DEFAULT } from './schema-form.options';
import { NzWidgetRegistry } from './src/widgets/nz-widget.registry';
import { WidgetRegistry } from './src/widget.registry';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './src/schema.validator.factory';
import { CustomTemplateDirective } from './src/widgets/custom/nz-template.directive';

// region: components

import {
    FormComponent,
    FormItemComponent,
    FormActionComponent,
} from './src';

const COMPONENTS = [
    FormComponent,
    FormItemComponent,
    FormActionComponent,
    CustomTemplateDirective
];

// endregion

// region: widgets

import {
    ObjectWidget,
    ArrayWidget,
    ButtonWidget,
    StringWidget,
    RadioWidget,
    DateWidget,
    TimeWidget,
    TextareaWidget,
    BooleanWidget,
    NumberWidget,
    CheckboxWidget,
    FileWidget,
    CascaderWidget,
    CustomWidget,
    TransferWidget,
    RangeWidget,
    TagWidget
} from './src/widgets';

const WIDGETS: any[] = [
    ObjectWidget,
    ArrayWidget,
    ButtonWidget,
    StringWidget,
    RadioWidget,
    DateWidget,
    TimeWidget,
    TextareaWidget,
    BooleanWidget,
    NumberWidget,
    CheckboxWidget,
    FileWidget,
    CascaderWidget,
    CustomWidget,
    TransferWidget,
    RangeWidget,
    TagWidget
];

// endregion

// region: export

export { FormComponent } from './src/form.component';
export { FormItemComponent } from './src/form-item.component';
export { FormActionComponent } from './src/form-item-action.component';
export * from './src/widgets';
export * from './src/schema';

// endregion

// region: ng-zorro-antd
import {
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzUploadModule,
    NzToolTipModule,
    NzCascaderModule,
    NzTransferModule,
    NzSliderModule,
    NzRadioModule,
    NzTagModule
} from 'ng-zorro-antd';
const ZORROMODULES = [
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzUploadModule,
    NzToolTipModule,
    NzCascaderModule,
    NzTransferModule,
    NzSliderModule,
    NzRadioModule,
    NzTagModule
];
// endregion

export function optionsFactory(options: SchemaFormOptions) {
    return Object.assign(DEFAULT, options);
}

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        ...ZORROMODULES
    ],
    declarations: [ ...COMPONENTS, ...WIDGETS ],
    entryComponents: WIDGETS,
    exports: [ ...COMPONENTS, ...WIDGETS ]
})
export class NzSchemaFormModule {
    public static forRoot(options?: SchemaFormOptions): ModuleWithProviders {
        return {
            ngModule: NzSchemaFormModule,
            providers: [
                { provide: NZ_SF_USER_OPTIONS_TOKEN, useValue: options },
                { provide: NZ_SF_OPTIONS_TOKEN, useFactory: optionsFactory, deps: [NZ_SF_USER_OPTIONS_TOKEN] },
                { provide: WidgetRegistry, useClass: NzWidgetRegistry },
                { provide: SchemaValidatorFactory, useClass: ZSchemaValidatorFactory }
            ]
        };
    }
}
