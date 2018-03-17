---
widget: date-range
title: 日期范围选择器
inherit: true
---

默认小部件，一般用于日期选择。

## Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
placeholder | 在文字框中显示提示讯息  | `string` | -
readOnly | 是否只读状态  | `boolean` | -
widget | 组件  | `string，object` | - 

## Widget Params

参数 | 说明 | 类型 | 默认值
----|------|-----|------
id | 组件名称  | `string` | `date`
format | 日期格式  | `string` | - 
showTime | 是否显示时间选择器 | `boolean` | `false`
start |  开始placeholder | `string`| `start`
end |  结束placeholder | `string`| `end`
separator | 日期分隔符 | `string` | `~`
## Demo

**各种格式的配置**

```json

{
	"dateRange": {
		"type": "string",
		"title": "日期范围",
		"widget": {
			"id": "date-range"
		}
	}
}

{
	"dateRange": {
		"type": "string",
		"title": "日期范围",
		"default": "2018-01-02~2018-02-03",
		"widget": {
			"id": "date-range",
			"format": "YYYY-MM-DD"
		}
	}
}

{
	"dateRange": {
		"type": "array",
		"items":{
			"type":"number"
		},
		"title": "日期范围",
		"default": [1520438400000, 1524326400000],
		"widget": "date-range"
	}
}

{
	"dateRange": {
		"type": "array",
		"items":{
			"type":"string"
		},
		"title": "日期范围",
		"default": ["2018-01-02", "2018-01-10"],
		"widget": "date-range"
	}
}


```
