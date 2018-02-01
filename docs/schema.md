---
order: 5
title: Schema
type: Basic
---

## 常规Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
debug | 会在控制台打印相关校验过程 | `boolean` | -
type | 数据类型，支持 JavaScript 基础类型 | `number,string,boolean,object,array` | `object`

**type注意事项**

- JSON 中 `date` 等同 `string` 类型
- 指定 `format` 标准参数可以自动适配渲染小部件
- 指定 `widget` 参数强制渲染小部件

## 渲染Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
widget | 指定采用什么小部件渲染数据  | `string,WidgetData` | -
title | 表单标题，等同 `label`  | `string` | -
description | 表单描述  | `string` | -
showDescription | 是否展示 `description`  | `boolean` | `false`
default | 默认值  | `any` | -
size | 控件大小  | `large,default,small` | `large`
disabled | 是否禁用状态  | `boolean` | -
class | 自定义类，等同 `[ngClass]` 值  | `string,string[]` | -
style | 自定义样式，等同 `[ngStyle]` 值  | `object` | -
grid | 响应式属性  | `SFGrid` | -

## 小部件Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
id | 小部件名称  | `string` | -
placeholder | 文字框中显示提示信息  | `string` | -
extra | 用于显示表单额外提示信息  | `string` | -

> 每一个小部件会有相应UI参数，请参考相应小部件文档。

## `SFGrid` 响应式Schema

`grid` 属性等同完整的 [Grid栅格系统](https://ng.ant.design/#/components/grid)，透过 `grid` 可以决定表单如何渲染。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
gutter | 栅格间隔  | `number` | -
span | 每个表单元素栅格占位格数，为 `0` 时相当于 `display: none`  | `number` | -
xs | `<768px` 响应式栅格，可为栅格数或一个包含其他属性的对象  | `number, Object` | -
sm | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象  | `number, Object` | -
md | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象  | `number, Object` | -
lg | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象  | `number, Object` | -
xl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象  | `number, Object` | -
xxl | 保留字段，`0.7.0` 后支持  | `number, Object` | -

## 水平布局Schema

> 务必二者总和为 `24`

参数 | 说明 | 类型 | 默认值
----|------|-----|------
span_label | `label` 所占栅格数  | `number` | 5
span_control | 表单控件所占栅格数  | `number` | 19
