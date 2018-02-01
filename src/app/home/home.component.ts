import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema } from 'nz-schema-form';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    value: any;
    schema: SFSchema = {
        debug: true,
        span_label: 5,
        span_control: 19,
        grid: {
            span: 8
        },
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                description: '请输入邮箱，最多20个字符',
                showDescription: true,
                maxLength: 20
            },
            name: {
                type: 'string',
                title: '姓名',
                description: '请输入姓名，3个字以上',
                minLength: 3
            },
            age: {
                type: 'number',
                title: '年龄',
                widget: {
                    id: 'number',
                    min: 18
                }
            },
            yesOrNot: {
                type: 'boolean',
                title: '允许售卖',
                default: true
            },
            agree: {
                type: 'boolean',
                description: `I have read the <a href="https://github.com/cipchk/nz-schema-form" target="_blank">agreement</a>`,
                widget: {
                    id: `checkbox`
                }
            },
            birthday: {
                type: 'string',
                title: '生日',
                widget: 'date'
            },
            type: {
                type: 'string',
                title: '类型',
                default: 'tom',
                widget: {
                    id: 'select',
                    allowClear: true,
                    data: [
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'tom', label: 'Tom' }
                    ]
                }
            },
            remark: {
                type: 'string',
                title: '描述',
                widget: {
                    id: 'textarea',
                    autosize: false,
                    rows: 10
                }
            },
            file: {
                type: 'string',
                title: '附件',
                widget: 'file'
            },
            custom: {
                type: 'string',
                title: '自定义内容',
                widget: 'custom'
            },
            geo: {
                type: 'string',
                title: '所在地',
                widget: {
                    id: 'cascader',
                    placeholder: '请选择',
                    load: (options: any) => {
                        options.resolve([
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                                isLeaf: true
                            }
                        ]);
                    }
                }
            },
            role: {
                type: 'string',
                title: '角色',
                grid: { span: 16 },
                widget: {
                    id: 'transfer',
                    dataSource: Array(10)
                        .fill({})
                        .map((v: any, i: number) => {
                            return { title: `content${i + 1}`, direction: i === 1 ? 'right' : '' };
                        })
                }
            },
            range: {
                type: 'number',
                title: '范围',
                default: 10,
                widget: {
                    id: 'range'
                }
            },
            like: {
                type: 'string',
                title: '兴趣',
                widget: {
                    id: 'tag',
                    tags: [{ id: 1, title: '电影', checked: true }, { id: 2, title: '书' }, { id: 3, title: '旅行' }, { id: 4, title: '美食', checked: true }]
                }
            },
            products: {
                type: 'array',
                title: '产品清单',
                maxItems: 2,
                items: {
                    type: 'object',
                    span_label: 5,
                    span_control: 19,
                    properties: {
                        pn: {
                            title: '产品名称',
                            type: 'string'
                        },
                        num: {
                            title: '件数',
                            type: 'number',
                            minimum: 1,
                            maximum: 1000
                        },
                        price: {
                            title: '金额',
                            type: 'number'
                        }
                    },
                    required: ['pn', 'num', 'price']
                }
            },
            gender: {
                type: 'string',
                title: '性别',
                default: 'men',
                widget: {
                    id: 'radio',
                    style: 'button',
                    selectList: [
                        {
                            label: 'Men',
                            value: 'men'
                        },
                        {
                            label: 'Women',
                            value: 'women'
                        }
                    ]
                }
            },
            intro: {
                type: 'string',
                title: '详情',
                grid: { span: 24 },
                widget: {
                    id: 'tinymce'
                }
            }
        },
        required: ['email'],
        button: {
            grid: { span: 24 },
            style: { 'text-align': 'center' },
            items: [{ label: '登录', id: 'send', submit: true }, { label: '重置', id: 'reset' }]
        }
    };
    model = { email: 'cipchk@qq.com' };
    actions = {
        send: (form: any) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: any) => {
            form.reset({});
        }
    };

    verticalValue: any;
    verticalSchema: SFSchema = {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                widget: {
                    placeholder: '邮箱'
                }
            },
            name: {
                type: 'number',
                pattern: '^[A-Z]',
                title: '姓名',
                widget: {
                    placeholder: '请输入姓名'
                }
            },
            age: {
                type: 'number',
                title: '年龄'
            },
            remark: {
                type: 'string',
                title: '描述'
            },
            products: {
                type: 'array',
                maxItems: 2,
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            title: '产品名称',
                            type: 'string'
                        },
                        num: {
                            title: '件数',
                            type: 'number'
                        },
                        price: {
                            title: '金额',
                            type: 'number'
                        }
                    }
                }
            }
        },
        button: {
            items: [{ label: 'Send', id: 'send', submit: true }, { label: 'Reset', id: 'reset' }]
        },
        required: ['email']
    };
    verticalModel = { email: 'cipchk@qq.com', name: 'cipchk' };

    inlineValue: any;
    inlineSchema: SFSchema = {
        properties: {
            name: {
                type: 'string',
                title: '用户名',
                widget: {
                    placeholder: '请输入用户名'
                },
                minLength: 3
            },
            password: {
                type: 'string',
                title: '密码',
                widget: {
                    placeholder: '请输入密码'
                },
                minLength: 6
            }
        },
        required: ['name', 'password'],
        button: {
            items: [{ label: '登录', id: 'send', submit: true }, { label: '重置', id: 'reset' }]
        }
    };
    inlineModel = { email: 'cipchk@qq.com', name: 'cipchk' };

    constructor(private msg: NzMessageService) {}
}
