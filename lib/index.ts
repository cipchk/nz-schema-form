import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemaValidatorFactory, WidgetRegistry, ZSchemaValidatorFactory, SchemaFormModule } from 'angular2-schema-form';

import { SchemaFormOptions } from './src/schema-form.options';
import { NzWidgetRegistry } from './src/widget.registry';

// region: components

import { FormComponent } from './src/form.component';

const COMPONENTS = [
    FormComponent,
];

// endregion

// region: inner components

import { FormItemComponent } from './src/form-item.component';

const INNERCOMPONENTS = [
    FormItemComponent,
];

// endregion

// region: widgets

import { ObjectWidget } from './src/object/object.widget';
import { ArrayWidget } from './src/array/array.widget';
import { ButtonWidget } from './src/button/button.widget';
import { StringWidget } from './src/string/string.widget';

const WIDGETS: any[] = [
    ObjectWidget,
    ArrayWidget,
    ButtonWidget,
    StringWidget,
];

// endregion

// export
export * from './src';

// region: ng-zorro-antd
import {
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
} from 'ng-zorro-antd';
const ZORROMODULES = [
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
];
// endregion

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, SchemaFormModule,
        ...ZORROMODULES
    ],
    declarations: [ ...COMPONENTS, ...INNERCOMPONENTS, ...WIDGETS ],
    entryComponents: WIDGETS,
    exports: [ ...COMPONENTS ]
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
