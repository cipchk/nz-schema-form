---
order: 100
title: 更新日志
type: Basic
---

### 0.1.0

`2018-3-2`

- `nz-sf` 组件
    - 新增 `refreshSchema()` 方法，用于需要动态修改 Schema 某个值时可以方便调用
    - 修复 `model` 参数双向绑定无效问题
- Schema
    - `visibleIf`：支持复杂表达式
- Widgets
    - `button`：新增 `popconfirm` 参数，允许设置按钮确认框
    - `number`：修复 `default` 值无效问题

### 0.0.1

`2018-2-27`

- **BREAKING CHANGES** 移除导出第三方小部件（TinymceWidget、UEditorWidget），改用只提供部件代码。
- 修复 `onlyVisual` 设置无效，由于 [#18](https://github.com/cipchk/nz-schema-form/issues/18) 关系默认为 `true`
- Widgets
    - 优化所有组件数据源优先采用Schema的 `enum` 属性
    - string：新增 `autocomplete` 属性
    - number：修复指定 `min` 时不变更的情况下无法获取值问题
    