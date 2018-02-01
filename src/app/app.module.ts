import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-md';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NzSchemaFormModule } from 'nz-schema-form';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ValidatorComponent } from './validator/validator.component';
import { DocumentComponent } from './document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ValidatorComponent,
    DocumentComponent
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
        { path: 'example', loadChildren: './example/example.module#ExampleModule' },
        { path: 'validator', component: ValidatorComponent },
        { path: 'document', redirectTo: 'document/getting-started', pathMatch: 'full' },
        {
            path: 'document/:id',
            component: DocumentComponent
        }
    ], { useHash: true }),
    NgZorroAntdModule.forRoot(),
    NzSchemaFormModule.forRoot({
    }),
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
