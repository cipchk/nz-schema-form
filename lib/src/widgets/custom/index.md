---
widget: custom
title: 自定义
---

完整更复杂的自定义需求。

## 如何使用？

自定义小部件无须在 Schema 中任何特殊定义，但务必确保 **nz-template** 是一个有效的值；它等同 Schema 属性名。

## Demo

```json
"custom": {
    "type": "string",
    "title": "自定义内容",
    "widget": "custom"
}
```

相对应模板：

```html
<nz-sf [schema]="schema" [model]="model" (onChange)="value=$event.value">
    <ng-template nz-template="custom" let-control let-schema>
        <nz-input [formControl]="control">
            <ng-template #addOnBefore>http://</ng-template>
            <ng-template #addOnAfter>.com</ng-template>
        </nz-input>
    </ng-template>
</nz-sf>
```

模板中有两个参数 `control` & `schema`，分别用于表单和原样Schema信息。`control` 会根据 Schema 校验结果产生视觉上的控制。
