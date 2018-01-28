import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SchemaFormModule } from 'angular2-schema-form';
import { NzSchemaFormModule } from 'nz-schema-form';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './example/example.component';
import { ValidatorComponent } from './validator/validator.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ExampleComponent,
        ValidatorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AceEditorModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'example', component: ExampleComponent },
            { path: 'validator', component: ValidatorComponent }
        ], { useHash: true }),
        NgZorroAntdModule.forRoot(),
        SchemaFormModule,
        NzSchemaFormModule.forRoot({
            date: {
                // serialize: (value: Date) => {
                //     return value.getTime();
                // },
                // deserialize: (value) => {
                //     if (!value)
                //         return null;
                //     return new Date(value);
                // },
                // format: 'YYYY-MM-DD'
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
