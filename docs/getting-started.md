---
order: 1
title: 开始使用
type: Basic
---

## 写在前面

nz-schema-form 是一个基于 [ng-zorro-antd](https://ng.ant.design/)、[JSON Schema](http://json-schema.org/) 标准的动态构建表单。

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
