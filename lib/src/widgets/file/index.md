---
widget: file
title: 文件上传
---

一般用于资源上传。

**注：** `nz-schema-form` 采用手动上传，因此整个过程中将不会触发任何上传动作，有关手动上传的方法请参照官网[示例](https://ng.ant.design/#/components/upload)。

## `widget` 自定义属性

参数 | 说明 | 类型 | 默认值
----|------|-----|------
accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | `string` | -
limit | 限制单次最多上传数量，`multiple` 打开时有效；`0` 表示不限  | `number` | `0`
size | 限制文件大小，单位：KB；`0` 表示不限  | `number` | `0`
fileType | 限制文件类型，例如：`image/png,image/jpeg,image/gif,image/bmp` | `string` | -
multiple | 是否支持多选文件，`IE10+` 支持。开启后按住 `ctrl` 可选择多个文件。 | `boolean` | `false`
showUploadList | 是否展示列表, 可设为一个对象，用于单独设定 `showPreviewIcon` 和 `showRemoveIcon` | `boolean` | `true`

## Demo

**基础**

```json
"image": {
    "type": "string",
    "title": "头像",
    "description": "点击上传",
    "widget": "file"
}
```

**限制1MB以内**

```json
"file": {
    "type": "string",
    "title": "附件",
    "widget": {
        "id": "file",
        "size": 1024,
        "buttonText": "点击上传"
    }
},
```
