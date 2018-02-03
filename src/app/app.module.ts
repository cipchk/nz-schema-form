import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-md';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NzSchemaFormModule, WidgetRegistry } from 'nz-schema-form';
import { NgxTinymceModule } from 'ngx-tinymce';
import { TinymceWidget } from 'nz-schema-form/src/widgets-third/tinymce/tinymce.widget';
import { UEditorModule } from 'ngx-ueditor';
import { UEditorWidget } from 'nz-schema-form/src/widgets-third/ueditor/ueditor.widget';
import { MyWidgetRegistry } from './my-widget-registry';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ValidatorComponent } from './validator/validator.component';
import { DocumentComponent } from './document/document.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    ValidatorComponent,
    DocumentComponent,
    TinymceWidget,
    UEditorWidget
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
        {
            path: '',
            component: LayoutComponent,
            children: [
                { path: 'example', loadChildren: './example/example.module#ExampleModule' },
                { path: 'validator', component: ValidatorComponent },
                { path: 'document', redirectTo: 'document/getting-started', pathMatch: 'full' },
                {
                    path: 'document/:id',
                    component: DocumentComponent
                }
            ]
        }
    ], environment.production ? { useHash: true, preloadingStrategy: PreloadAllModules } : { useHash: true }),
    NgZorroAntdModule.forRoot(),
    NzSchemaFormModule.forRoot({
    }),
    MarkdownModule.forRoot(),
    UEditorModule.forRoot({
        // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
        // 指定ueditor.js路径目录
        path: '//apps.bdimg.com/libs/ueditor/1.4.3.1/',
        // 默认全局配置项
        options: {
            themePath: '//apps.bdimg.com/libs/ueditor/1.4.3.1/themes/'
        }
    }),
    NgxTinymceModule.forRoot({
        baseURL: '//cdn.bootcss.com/tinymce/4.7.4/'
    })
  ],
  providers: [
    { provide: WidgetRegistry, useClass: MyWidgetRegistry }
  ],
  entryComponents: [
    TinymceWidget,
    UEditorWidget
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
