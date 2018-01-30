---
widget: textarea
title: 多行文本框
---

一般用于多行字符串。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
autosize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }`  | `Boolean|Object` | `true`
rows | 控制固定框的行数  | `String` | -

## Demo

**基础**

```json
"remark": {
    "type": "string",
    "title": "描述",
    "widget": "textarea"
}
```

**指定最少行数**

```json
"remark": {
    "type": "string",
    "title": "描述",
    "widget": {
        "id": "textarea",
        "autosize": { "minRows": 2, "maxRows": 6 }
    }
},
```
