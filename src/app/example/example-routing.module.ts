import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleLayoutComponent } from './layout/layout.component';
import { ExampleBasicComponent } from './basic/basic.component';
import { ExampleValidationComponent } from './validation/validation.component';
import { ExampleConditionalComponent } from './conditional/conditional.component';
import { ExampleSortComponent } from './sort/sort.component';

const routes: Routes = [
    {
        path: '',
        component: ExampleLayoutComponent,
        children: [
            { path: '', redirectTo: 'basic', pathMatch: 'full' },
            { path: 'basic', component: ExampleBasicComponent },
            { path: 'validation', component: ExampleValidationComponent },
            { path: 'conditional', component: ExampleConditionalComponent },
            { path: 'sort', component: ExampleSortComponent }
        ]
    }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ExampleRoutingModule { }
