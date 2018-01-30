---
order: 2
title: 自定义错误格式
type: Basic
---

## 写在前面

Schema属性 `errors` 可以构建非常自由的错误信息，Schema 在校验错误过程中会产生一组固定错误类型错误数据，例如一个完整的错误数据：

```json
{
    "code": "INVALID_FORMAT",
    "params": [ "email", "123" ],
    "message": "邮箱格式不正确",
    "path": "#/"
}
```

## 错误类型

完整的错误类型请自 [ERROR](https://github.com/cipchk/nz-schema-form/blob/master/lib/src/schema/errors.ts)。

## 如何自定义错误格式

错误消息是一个字符串类型，但允许使用一些动态命令，包括：

| 名称 | 描述 |
| --- | ---- |
| `code` | 错误名 |
| `title` | 等同 Schema 中 `title` 值 |
| `param.[0-9]` | 校验数据界限，例如 `MIN_LENGTH` 会包含 `param.0` 表示当前字符长度，`param.1` 表示至少字符长度 |
| `description` | 等同 Schema 中 `description` 值 |
| `message` | 默认错误信息 |

分别有两个地方可以处理：

**模块定义时**

默认情况下，nz-schema-form 也自定义了一些比较符合[本地化](https://github.com/cipchk/nz-schema-form/blob/master/lib/src/schema/errors.ts)消息。

> 错误格式文本不支持函数类型。

```ts
NzSchemaFormModule.forRoot({
    errors: {
        INVALID_FORMAT: `{title}格式不正确`,
        MIN_LENGTH:     `至少{param.1}个字符以上`
    }
})
```

**Schema**

```js
name: {
    type: "string",
    placeholder: "请输入姓名",
    minLength: 5,
    pattern: `^[0-9a-z]+$`
    errors: {
        MIN_LENGTH: "至少{param.1}个字符以上",
        PATTERN: (val: ErrorData) => `至少${val.params[1]}个字符以上`
    }
}
```

## 视觉

可以通过设置 `onlyVisual` 属性（模块引入时或Schema）控制只展示错误视觉不显示错误文本。
