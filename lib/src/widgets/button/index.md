---
widget: button
title: 按钮
---

按钮用于提交或重置操作。

## `button` Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
items | 按钮组  | `any[]` | -

### `items` 参数

参数 | 说明 | 类型 | 默认值
----|------|-----|------
id | 编号  | `string` | -
label | 按钮文本  | `string` | -
submit | 是否提交按钮，`true` 时校验结果 `invalid` 时为禁止状态且类型为 `primary`  | `boolean` | -
type | 按钮类型  | `primary,default,dashed,danger` | -
parameters | 回调携带参数  | `any` | -

## Demo

**基础**

```ts
schema: SFSchema = {
    properties: {},
    button: {
        grid: { span: 24 },
        style: { 'text-align': 'center' },
        items: [{ label: '登录', id: 'send', submit: true }, { label: '重置', id: 'reset' }]
    }
}
```
