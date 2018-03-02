---
order: 4
title: 常见问题
type: Basic
---

## 隐藏字段的用处？

当你需要一些必填字段但又无需任何呈现时非常有用，例如 `parent_id` 父编号可能来自已知信息。

或一些条件表单中，例如：

```ts
schema: SFSchema = {
    properties: {
        parent_id: {
            type: 'string',
            widget: 'hidden'
        },
        remark: {
            type: 'string',
            title: '描述',
            widget: 'textarea',
            visibleIf: {
                parent_id: (value: number) => value > 0
            }
        }
    }
}
```

其中 `parent_id` 必须定义为隐藏字段，这样在条件 `visibleIf` 中才能访问到你希望的属性值。

## 如何动态使用 Schema？

一般分为两种情形：

**1、Scheam 定义后可能受限于某个数据来自远程**

```ts
@ViewChild('sf') sf: FormComponent;
schema: SFSchema = {
    properties: {
        app: {
            type: 'string',
            title: '附属应用',
            widget: 'select',
            enum: []
        }
    }
};

ngOnInit() {
    this.http.get('/apps').subscribe((res: any) => {
        this.schema.properties.app.enum = res;
        this.sf.refreshSchema();
    });
}
```

**2、远程 Schema**

```ts
schema: SFSchema = {
    properties: {}
};

ngOnInit() {
    this.http.get('/schema').subscribe((res: any) => {
        this.schema = res;
    });
}
```

## Schema 中 `enum` 和 `widget.data` 有什么区别？

二者是兼容的，`enum` 属性 Json Schema 标准之一；后者是为了使小部件属性的完整性；本质上应该尽可能使用 `enum` 标准。

## 什么时候使用 `default`？

Schema 的 `default` 用于设置初始化，一般情况下当修改表单时是需要提供 `model` 参数，但对于增加表单来说，应该依靠 `default` 提供一个更友好的表单给用户。
