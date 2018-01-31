---
widget: transfer
title: 穿梭框
---

双栏穿梭选择框。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
dataSource | 数据源，其中若数据属性 `direction: 'right'` 将会被渲染到右边一栏中 | `TransferItem[]` | `[]`
titles | 标题集合，顺序从左至右 | `string[]` | `['', '']`
operations | 操作文案集合，顺序从下至上 | `string[]` | `['', '']`
listStyle | 两个穿梭框的自定义样式，以`ngStyle`写法标题 | `object` | -
itemUnit | 单数单位 | `string` | `项目`
itemsUnit | 复数单位 | `string` | `项目`
showSearch | 是否显示搜索框 | `boolean` | `false`
filterOption | 接收 `inputValueoption` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | - | -
searchPlaceholder | 搜索框的默认值 | `string` | -
notFoundContent | 当列表为空时显示的内容 | `string` | -
canMove | 穿梭时二次校验。 | `function` | -
change | 选项在两栏之间转移时的回调函数 | `Function` | -
searchChange | 搜索框内容时改变时的回调函数 | `Function` | -
selectChange | 选中项发生改变时的回调函数 | `Function` | -

## Demo

**基础**

```json
"role": {
    "type": "string",
    "title": "角色",
    "widget": {
        "id": "transfer",
        "dataSource": [
            {
                "title": "标题"
            }
        ]
    }
}
```
