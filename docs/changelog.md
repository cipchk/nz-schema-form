---
order: 100
title: 更新日志
type: Basic
---

### 0.0.1

`2018-2-27`

- **BREAKING CHANGES** 移除导出第三方小部件（TinymceWidget、UEditorWidget），改用只提供部件代码。
- 修复 `onlyVisual` 设置无效，由于 [#18](https://github.com/cipchk/nz-schema-form/issues/18) 关系默认为 `true`
- Widgets
    - 优化所有组件数据源优先采用Schema的 `enum` 属性
    - string：新增 `autocomplete` 属性
    - number：修复指定 `min` 时不变更的情况下无法获取值问题
    