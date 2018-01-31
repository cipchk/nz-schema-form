---
widget: cascader
title: 级联选择
---

一般用于省市区，公司层级，事物分类等。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
showSearch | 是否支持搜索 | `bool` | `false`
allowClear | 是否显示清除按钮 | `bool` | `true`
clearText | 清除按钮的标题 | `string` | `清除`
showArrow | 是否显示箭头 | `bool` | `true`
popupClassName | 弹出菜单的自定义样式 | `string` | -
columnClassName | 弹出菜单中数据列的自定义样式 | `string` | -
data | 初始化列数据，用于第一列的数据，子列通过选项的 `children` 加载，或者通过 `load` 事件异步加载。 | `Array` | -
enableCache | 是否缓存异步加载的数据，若每次异步加载的数据都是变化的，需将该值设置为 false | `bool` | `true`
expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | `string` | `click`
changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示 | `bool` | `false`
changeOn | 可通过自定义的函数来判断点击菜单选项是否应该发生变化，当函数返回 true 时，将发生变化。函数说明：(option: CascaderOption, level: number): boolean | `Function` | -
triggerAction | 触发菜单出现的行为，可选Array<'click' | 'hover'> | `string[]` | `['click']`
displayRender | 选择后展示的渲染函数。函数说明：(label: string[], selectedOptions: CascaderOption[]) => string	 | `Function` | `label => label.join(' / ')`
valueProperty | 值 `value` 的属性名称 | `string` | `value`
labelProperty | 值 `label` 的属性名称 | `string` | `label`
visibleChange | 异步加载事件 | `function` | -
change | 选项值变更事件 | `function` | -
selectionChange | 选项变更事件 | `function` | -
select | 选项被选中事件 | `function` | -
load | 异步加载事件 | `function` | -
clear | 内容被清空事件 | `function` | -

## Demo

**基础**

```json
"geo": {
    "type": "string",
    "title": "所在地",
    "widget": {
        "id": "cascader",
        "data": [
            {
                "value": "hangzhou",
                "label": "Hangzhou"
            }
        ]
    }
}
```

**异步数据**

```ts
"geo": {
    "type": "string",
    "title": "所在地",
    "widget": {
        "id": "cascader",
        "load": (options: any) => {
            options.resolve([{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
                isLeaf: true
            }]);
        }
    }
}
```
