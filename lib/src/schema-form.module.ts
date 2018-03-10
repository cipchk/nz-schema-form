
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchemaFormOptions, NZ_SF_USER_OPTIONS_TOKEN, NZ_SF_OPTIONS_TOKEN, DEFAULT } from './schema-form.options';
import { NzWidgetRegistry } from './widgets/nz-widget.registry';
import { WidgetRegistry } from './widget.registry';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './schema.validator.factory';
import { CustomTemplateDirective } from './widgets/custom/nz-template.directive';
import { FixedLabelDirective } from './widgets/fixed-label.directive';

// region: components

import { FormComponent } from './form.component';
import { FormItemComponent } from './form-item.component';
import { FormActionComponent } from './form-item-action.component';

const COMPONENTS = [
    FormComponent,
    FormItemComponent,
    FormActionComponent,
    CustomTemplateDirective,
    FixedLabelDirective
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
    TagWidget,
    RateWidget,
    SelectWidget,
    DateRangeWidget,
} from './widgets';

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
    TagWidget,
    RateWidget,
    SelectWidget,
    DateRangeWidget,
];

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
    NzTagModule,
    NzRateModule,
    NzSelectModule,
    NzPopconfirmModule
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
    NzTagModule,
    NzRateModule,
    NzSelectModule,
    NzPopconfirmModule
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
    static forRoot(options?: SchemaFormOptions): ModuleWithProviders {
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
