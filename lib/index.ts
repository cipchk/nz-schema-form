import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchemaFormOptions } from './schema-form.options';
import { NzWidgetRegistry } from './src/nz-widget.registry';
import { WidgetRegistry } from './src/widget.registry';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './src/schema.validator.factory';

// region: components

import { FormComponent } from './src/form.component';
import { FormItemComponent } from './src/form-item.component';
import { FormActionComponent } from './src/form-item-action.component';

const COMPONENTS = [
    FormComponent,
    FormItemComponent,
    FormActionComponent,
];

// endregion

// region: widgets

import { ObjectWidget } from './src/object/object.widget';
import { ArrayWidget } from './src/array/array.widget';
import { ButtonWidget } from './src/button/button.widget';
import { StringWidget } from './src/string/string.widget';
import { DateWidget } from './src/date/date.widget';

const WIDGETS: any[] = [
    ObjectWidget,
    ArrayWidget,
    ButtonWidget,
    StringWidget,
    DateWidget
];

// endregion

// region: export

export { FormComponent } from './src/form.component';
export { FormItemComponent } from './src/form-item.component';
export { FormActionComponent } from './src/form-item-action.component';
export * from './src';

// endregion

// region: ng-zorro-antd
import {
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
} from 'ng-zorro-antd';
const ZORROMODULES = [
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule
];
// endregion

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
    public static forRoot(options: SchemaFormOptions): ModuleWithProviders {
        return {
            ngModule: NzSchemaFormModule,
            providers: [
                { provide: SchemaFormOptions, useValue: options },
                { provide: WidgetRegistry, useClass: NzWidgetRegistry },
                { provide: SchemaValidatorFactory, useClass: ZSchemaValidatorFactory }
            ]
        };
    }
}
