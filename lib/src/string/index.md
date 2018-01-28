---
widget: string
title: 文本框
inherit: true
---

默认小部件，一般用于字符串元素。

## Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
placeholder | 在文字框中显示提示讯息  | `string` | -
maxLength | 表单最大长度  | `number` | -
minLength | 表单最小长度  | `number` | -
readOnly | 是否只读状态  | `boolean` | -

## Demo

**限定邮箱最多30个字符**

```json
"email": {
    "type": "string",
    "placeholder": "请输入邮箱，最多20个字符",
    "maxLength": 30 
}
```
