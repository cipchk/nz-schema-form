import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema } from 'nz-schema-form';

@Component({
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
                placeholder: '请输入邮箱，最多20个字符',
                maxLength: 20
            },
            name: {
                type: 'string',
                title: '姓名',
                placeholder: '请输入姓名',
                description: '3个字以上',
                minLength: 3
            },
            age: {
                type: 'number',
                title: '年龄'
            },
            remark1: {
                type: 'string',
                title: '描述1'
            },
            remark2: {
                type: 'string',
                title: '描述2'
            },
            remark3: {
                type: 'string',
                title: '描述3'
            },
            remark4: {
                type: 'string',
                title: '描述4'
            },
            remark5: {
                type: 'string',
                title: '描述5'
            },
            remark6: {
                type: 'string',
                title: '描述6'
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
                    required: [ 'pn', 'num', 'price' ],
                },
            }
        },
        required: [ 'email', 'name' ],
        button: {
            grid: { span: 24 },
            style: { 'text-align': 'center' },
            items: [
                { label: '登录', id: 'send', submit: true },
                { label: '重置', id: 'reset' }
            ]
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
                placeholder: '邮箱'
            },
            name: {
                type: 'number',
                pattern: '^[A-Z]',
                title: '姓名',
                placeholder: '请输入姓名',
                description: '必须3个字以上'
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
            items: [
                { label: 'Send', id: 'send', submit: true },
                { label: 'Reset', id: 'reset' }
            ]
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
                placeholder: '请输入用户名',
                minLength: 3
            },
            password: {
                type: 'string',
                title: '密码',
                placeholder: '请输入密码',
                minLength: 6
            }
        },
        required: ['name', 'password'],
        button: {
            items: [
                { label: '登录', id: 'send', submit: true },
                { label: '重置', id: 'reset' }
            ]
        }
    };
    inlineModel = { email: 'cipchk@qq.com', name: 'cipchk' };

    constructor(private msg: NzMessageService) {}
}
