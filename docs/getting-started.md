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
        NzSchemaFormModule.forRoot(<SchemaFormOptions>{
        })
    ]
})
export class AppModule { }
```

**SchemaFormOptions**

参数 | 说明 | 类型 | 默认值
----|------|-----|------
zSchemaOptions | [z-schema](https://github.com/zaggino/z-schema) 参数 | `any` | -
ingoreTypeValidator | 是否忽略数据类型校验 <br>`false` 限定 Schema 中 `type` 类型，若产生的数据非 `type` 类型会视为错误<br>`true` 不限定 Schema 中 `type` 类型，若产生的数据非 `type` 类型会视为成功 | `boolean` | `true`
onlyVisual | 是否只展示错误视觉不显示错误文本 | `boolean` | `false`
showDescription | 是否展示 `description` | `boolean` | `false`
errors | 自定义通用错误信息 | `{ [ key: string ]: string }` | -
date | 日期小部件配置 | `any` | -
time | 时间小部件配置 | `any` | -

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
