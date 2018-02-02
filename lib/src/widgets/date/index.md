---
widget: date
title: 日期选择器
inherit: true
---

默认小部件，一般用于日期选择。

## Schema

参数 | 说明 | 类型 | 默认值
----|------|-----|------
placeholder | 在文字框中显示提示讯息  | `string` | -
readOnly | 是否只读状态  | `boolean` | -
widget | 组件  | `string,object` | - 

## Widget Params

参数 | 说明 | 类型 | 默认值
----|------|-----|------
id | 组件名称  | `string` | `date`
format | 日期格式  | `string` | - 
showTime | 是否显示时间选择器 | `boolean` | `false`

## Provider Settings

参数 | 说明 | 类型 | 默认值
----|------|-----|------

format | 格式见moment  | `boolean` | -
serialize | 数据转出部件函数  | `function` | - 
deserialize | 数据转入部件函数  | `function` | - 

配置如：
```
    NzSchemaFormModule.forRoot({
        date: {
                serialize: (value: Date) => {
                    return value.getTime();
                },
                deserialize: (value) => {
                    if (!value)
                        return null;
                    return new Date(value);
                },
                format: 'YYYY-MM-DD'
        }
    }) 
```
 
## Demo

**各种格式的配置**

```json

{
	"birthday": {
		"type": "string",
		"title": "生日",
		"widget": {
			"id": "date",
			"format": "YYYY/MM/DD"
		}
	},
	"date1": {
		"type": "number",
		"title": "时间戳",
		"default": 1517159217913,
		"widget": {
			"id": "date",
			"format": "YYYY/MM/DD"
		}
	},
	"date2": {
		"type": "string",
		"title": "ISO日期",
		"default": "2018-01-28T17:06:57.913Z",
		"widget": {
			"id": "date"
		}
	},
	"date3": {
		"type": "string",
		"title": "年月日",
		"default": "2018/01/11",
		"widget": {
			"id": "date",
			"format": "YYYY/MM/DD"
		}
	}
}
```
