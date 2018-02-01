---
widget: range
title: 滑动输入条
---

滑动型输入器，展示当前值和可选范围。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
range | 当添加该属性时，启动双滑块模式 | `attribute` | -
min | 最小值 | `number` | `0`
max | 最大值 | `number` | `100`
step | 步长 | `number` | `1`
marks | 刻度标记 | `object` | -
dots | 是否只能拖拽到刻度上 | `Boolean` | `false`
included | 是否包含。`marks` 不为空对象时有效，值为 `true` 时表示值为包含关系，`false` 表示并列 | `Boolean` | `true`
vertical | 竖直显示。添加该属性时，Slider 为垂直方向。 | `attribute` | -
afterChange | 与 `onmouseup` 触发时机一致，把当前值作为参数传入。 | `Function` | -
formatter | 格式化 tip | `Function` | -

## Demo

**基础**

```json
"range": {
    "type": "number",
    "title": "范围",
    "default": 10,
    "widget": "range"
}
```
