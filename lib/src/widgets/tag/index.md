---
widget: tag
title: 热门标签
---

进行标记标签。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
tags | 数据源 | `Array` | -

数组必须包括 `title` 属性，用于标签文本； `checked` 属性表示默认是否选中状态。

## Demo

**基础**

```json
"like": {
    "type": "number",
    "title": "兴趣",
    "widget": {
        "id": "tag",
        "tags": [
            { "id": 1, "title": "电影", "checked": true },
            { "id": 2, "title": "书" },
            { "id": 3, "title": "旅行" }
        ]
    }
}
```
