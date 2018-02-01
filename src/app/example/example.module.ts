import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ExampleRoutingModule } from './example-routing.module';

import { ExampleLayoutComponent } from './layout/layout.component';
import { ExampleBasicComponent } from './basic/basic.component';
import { ExampleValidationComponent } from './validation/validation.component';
import { ExampleConditionalComponent } from './conditional/conditional.component';
import { ExampleSortComponent } from './sort/sort.component';

@NgModule({
    imports: [ SharedModule, ExampleRoutingModule ],
    declarations: [
        ExampleLayoutComponent,
        ExampleBasicComponent,
        ExampleValidationComponent,
        ExampleConditionalComponent,
        ExampleSortComponent
    ]
})
export class ExampleModule { }
