---
widget: select
title: 选择器
---

类似 Select2 的选择器。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
style | 设置 `nz-select` 样式，等同 `ngStyle` 值 | `Object` | -
data | 数据源 | `{ "label": string, "value": string }{]` | -
mode | 设置 Select 的模式 | `multiple,tags` | -
openChange | 下拉菜单打开关闭回调函数 | `Func` | -
filter | 是否根据输入过滤选项 | `Boolean` | `true`
keepUnListOptions | 当添加该属性时，将保留不在当前选项框但已被选择的数据，仅对多选有效 | `attribute` | -
allowClear | 当添加该属性时，支持清除, 单选模式有效 | `attribute` | -
showSearch | 是否启用搜索框 | `Boolean` | `false`
searchChange | 搜索内容变化回调函数，参数为搜索内容，必须返回 `Promise` 对象 | `Func` | -
notFoundContent | 当下拉列表为空时显示的内容 | `String` | `无法找到`
tags | tags select，随意输入的内容，回车键新增tag | `Boolean` | -
openChange | 下拉菜单打开关闭回调函数 | `Function` | -
scrollToBottom | 下拉菜单滚动到底部回调，可用于作为动态加载的触发条件 | `Function` | -

## Demo

**基础**

```json
"type": {
    "type": "string",
    "title": "类型",
    "default": "tom",
    "widget": {
        "id": "select",
        "data": [
            { "value": "jack", "label": "Jack" },
            { "value": "lucy", "label": "Lucy" },
            { "value": "tom", "label": "Tom", "disabled": true }
        ]
    }
}
```
