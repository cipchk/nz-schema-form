---
order: 1
title: 开始使用
type: Basic
---

nz-schema-form [![NPM version](https://img.shields.io/npm/v/nz-schema-form.svg)](https://www.npmjs.com/package/nz-schema-form) 是一个基于 [ng-zorro-antd](https://ng.ant.design/)、[JSON Schema](http://json-schema.org/) 标准的动态构建表单。

## 特性

- 符合 JSON Schema 标准
- 基于 ng-zorro-antd 基础组件库
- 秉承 Ant Design 价值观
- 二十几种小部件
- 可自定义小部件满足业务需求

## 如何使用？

安装 `nz-schema-form` 依赖包：

```bash
npm install nz-schema-form --save
```

导入 `NzSchemaFormModule` 模块：

```typescript
import { NzSchemaFormModule } from 'nz-schema-form';

@NgModule({
    imports: [
        NzSchemaFormModule.forRoot()
    ]
})
export class AppModule { }
```

构建一个邮箱、姓名表单：

```ts
@Component({
    selector: 'app-home',
    template: `
    <nz-sf [schema]="schema" [model]="model" [actions]="actions" (onChange)="value=$event.value">
    </nz-sf>
    <p>{{value | json}}</p>
    `
})
export class HomeComponent {
    value: any;

    schema: SFSchema = {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                maxLength: 20
            },
            name: {
                type: 'string',
                title: '姓名',
                minLength: 3
            }
        }
    };
}
```

## THANK YOU

cipchk, vellengs, canaanjin
