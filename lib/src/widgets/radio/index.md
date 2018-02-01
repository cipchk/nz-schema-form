---
widget: radio
title: 单选组
---

一般用于在多个备选项中选中单个状态。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
style | radio的样式  | `'default|button'` | `'default'`
selectList | 选项列表  | `SelectItem[]` | `[]`

### `SelectItem` 属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
label | 选项标签内容  | `string` | `-`
value | 选项值  | `string` | `-`
disabled | 当前选项是否不可选  | `boolean` | `false`

## Demo

**基础**

```json
"gender": {
    "type": "string",
     "widget": {
          "id": "radio",
          "selectList": [
              {
                  "label": "Men",
                  "value": "men",
                  "disabled":true
              }, {
                  "label": "Women",
                  "value": "women",
                  "disabled":false
              }
          ]
      }
}
```
