---
order: 5
title: 通用Schema
type: Basic
---

## 常规Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
debug | 会在控制台打印相关校验过程 | `boolean` | -

## 渲染Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
widget | 指定采用什么小部件渲染数据  | `string | Object` | -
title | 表单标题，等同 `label`  | `string` | -
description | 表单描述  | `string` | -
size | 控件大小  | `large,default,small` | `large`
disabled | 是否禁用状态  | `boolean` | -
default | 默认值  | `any` | -

## 响应式Schema

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
