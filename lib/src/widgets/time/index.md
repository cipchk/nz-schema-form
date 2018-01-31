---
widget: time
title: 时间选择器
inherit: true
---

默认小部件，一般用于时间选择。

## type 
类型支持

string | number 

若选择 number 类型则默认为时间戳。

## Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
placeholder | 在文字框中显示提示讯息  | `string` | -
readOnly | 是否只读状态  | `boolean` | -
widget | 组件  | `string | object` | - 

## Widget Params

参数 | 说明 | 类型 | 默认值
----|------|-----|------
id | 组件名称  | `string` | `date`
format | 日期格式  | `string` | `HH:mm:ss`
disabledHours | 禁用小时  | `string` | - 
disabledMinutes | 禁用分钟  | `string` | - 
disabledSeconds | 禁用秒钟  | `string` | - 
hideDisabledOptions | 隐藏禁用项目  | `string` | -  


## Provider Settings

参数 | 说明 | 类型 | 默认值
----|------|-----|------

format | 格式见moment  | `boolean` | -
serialize | 数据转出部件函数  | `function` | - 
deserialize | 数据转入部件函数  | `function` | - 

配置如：
```
    NzSchemaFormModule.forRoot({
        time: {
                serialize: (value) => {
                    return value;
                },
                deserialize: (value) => {
                    return value
                },
                format: 'HH:mm:ss'
        }
    }) 
```
 
## Demo

**各种格式的配置**

```json

{
	"time": {
		"type": "number",
		"title": "时间戳",
		"default": 1517159217913,
		"widget": {
			"id": "time",
			"format": "HH:mm:ss"
		}
	},
	"time2": {
		"type": "string",
		"title": "时间:分",
		"default": "05:33",
		"widget": {
            "id": "time",
            "format": "HH:mm"
		}
    },
    "time3": {
		"type": "string",
		"title": "时间:分",
		"default": "05:33",
		"widget": {
            "id": "time",
            "disabledHours":true
		}
	}
}
```
