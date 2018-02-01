---
order: 3
title: 自定义小部件
type: Basic
---

## 写在前面

nz-schema-form 尽可能满足不同需求，除现有内置的十几种小部件外，可以通过以下两种方式进一步扩展需求：

## 一、利用 `custom` 小部件进行扩展

细节请参考 [custom-自定义](https://cipchk.github.io/nz-schema-form/#/document/custom)。

## 二、完全自定义

当 `custom` 小部件无法满足你的扩展时，可以使用更宽松的扩展方式。

### 1、编写小部件

**使用未注册小部件库**

默认情况下 nz-schema-form 实现了一些常见需求，但需要额外类库支持的，称它为第三方组件小部件，这一部分默认情况下未注册；只需要简单注册即可使用，见注册小部件说明。

这些组件包括：

| 名称 | 描述 | 描述 |
| --- | ---- | ---- |
| `tinymce` | Tinymce 富文本框 | [文档](https://cipchk.github.io/nz-schema-form/#/document/tinymce) |
| `ueditor` | UEditor 富文本框 | [文档](https://cipchk.github.io/nz-schema-form/#/document/ueditor) |

引用路径：

```ts
import { UEditorWidget } from 'nz-schema-form/src/widgets-third/ueditor/ueditor.widget';
```

**自己创建小部件**

小部件就是一个组件，你只需要继承 `ControlWidget` 就相当于构建一个小部件，其结构如下：

```ts
import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'nz-schema-form';

@Component({
    selector: 'nz-sf-ueditor-widget',
    template: `
    <!-- 表单 `label` 区域，建议保持以下原样代码，以确保响应式的支持 -->
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="required" [attr.for]="id">
            <span>
                {{ schema.title }}
                <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
                    <i nz-tooltip class="anticon anticon-question-circle-o"></i>
                </nz-tooltip>
            </span>
        </label>
    </div>
    <!-- 表单 `control` 区域，建议保持以下原样代码，以确保响应式的支持 -->
    <div nz-form-control nz-col
        [nzSpan]="schema.span_control"
        [nzOffset]="schema.offset_control">

            <!-- 自定义控件区域 -->
            <ueditor
                [formControl]="control"
                [config]="config"
                [loadingTip]="loadingTip"
                (onContentChange)="change($event)"></ueditor>

        <!-- 异常处理，建议保持以下原样代码，以确保响应式的支持 -->
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class UEditorWidget extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'ueditor';

    /**
     * 组件所需要的参数，建议使用 `ngOnInit` 获取
     */
    config: any;
    loadingTip: string;

    ngOnInit(): void {
        this.loadingTip = this.widgetData.loadingTip || '加载中……';
        this.config = this.widgetData.config || {};
    }
}
```

### 2、注册小部件

**新建注册类**

新建一个 `MyWidgetRegistry` 并继承 `NzWidgetRegistry` 以确保默认小部件有效，同时在 `constructor` 中重新注册自定义小部件类。

```ts
import { NzWidgetRegistry } from 'nz-schema-form';
import { UEditorWidget } from 'nz-schema-form/src/widgets-third/ueditor/ueditor.widget';

export class MyWidgetRegistry extends NzWidgetRegistry {
    constructor() {
        super();

        this.register(UEditorWidget.KEY,  UEditorWidget);
    }
}
```

**注册MyWidgetRegistry**

将 `MyWidgetRegistry` 覆盖掉 `WidgetRegistry`，确保自定义小部件生效。

```ts
@NgModule({
    declarations: [ UEditorWidget ],
    entryComponents: [ UEditorWidget ],
    providers: [
        { provide: WidgetRegistry, useClass: MyWidgetRegistry }
    ]
})
```

### 3、使用自定义小部件

同其他小部件一样，只需要指定 `widget` 值，例如：

```json
"intro": {
    "type": "string",
    "widget" "ueditor"
}
```
