---
widget: number
title: 数字输入框
---

使用 `nz-switch` 组件；通过鼠标或键盘，输入范围内的数值。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
min | 最小值  | `number` | `-Infinity`
max | 最大值  | `number` | `Infinity`
step | 每次改变步数，可以为小数  | `number` | `1`
allowClear | 是否允许清空input number中的数值	  | `boolean` | `false`
formatter | 指定输入框展示值的格式  | `function(value: number | string): string` | -
parser | 指定从 nzFormatter 里转换回数字的方式，和 nzFormatter 搭配使用  | `function( string): number` | -

## Demo

**基础**

```json
"age": {
    "type": "number",
    "title": "年龄"
}
```

**设置最小18岁**

```json
"age": {
    "type": "number",
    "title": "年龄",
    "widget": {
        "id": "number",
        "min": 18
    }
}
```
