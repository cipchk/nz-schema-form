---
widget: string
title: 文本框
inherit: true
---

默认小部件，一般用于字符串元素。

## 常见问题

为什么不支持前后缀等，由于 `nz-input` 目前并不支持 `maxlength` 属性，因此当下使用 `nz-input` 指令方式，倒置失去一些无法实现的功能，若有需求可以使用自定义方式。

## Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
type | 等同 input 的 `type` 值，例如：`password`  | `string` | -
placeholder | 在文字框中显示提示讯息  | `string` | -
autocomplete | 自动完成功能的表单  | `on,off` | -
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
