import { Component } from '@angular/core';
import { WidgetRegistry } from 'angular2-schema-form';
import { NzMessageService } from 'ng-zorro-antd';
import { ObjectProperty } from 'angular2-schema-form/dist/model';
import { SFSchema } from '../../../lib/index';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    schema: SFSchema = {
        span_label: 4,
        span: 8,
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                placeholder: '请输入邮箱，最多20个字符',
                maxLength: 20,
                debug: true
            },
            name: {
                type: 'string',
                title: '姓名',
                placeholder: '请输入姓名',
                description: '必须大写开头且3个字以上',
                minLength: 3,
                debug: true
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
                title: '产品清单',
                maxItems: 2,
                items: {
                    type: 'object',
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
        buttons: [
            { label: 'Send', id: 'send', submit: true, offset: 4 },
            { label: 'Reset', id: 'reset' }
        ]
    };
    model = { email: 'cipchk@qq.com' };
    actions = {
        send: (form: ObjectProperty) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: ObjectProperty) => {
            form.reset({});
        }
    };

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
        buttons: [
            { label: 'Send', id: 'send', submit: true },
            { label: 'Reset', id: 'reset' }
        ],
        required: ['email']
    };
    verticalModel = { email: 'cipchk@qq.com', name: 'cipchk' };

    inlineSchema: SFSchema = {
        properties: {
            name: {
                type: 'string',
                title: '用户名',
                placeholder: '请输入用户名',
                description: '必须3位以上',
                minLength: 3,
                span_label: 5,
                span: 19
            },
            password: {
                type: 'string',
                title: '密码',
                placeholder: '请输入密码',
                description: '必须6位以上',
                minLength: 6,
                span_label: 5,
                span: 19
            }
        },
        required: ['name', 'password'],
        fieldsets: [{ fields: ['name', 'password'], gutter: 24, span: 12 }],
        buttons: [
            { label: '登录', id: 'send', submit: true },
            { label: '重置', id: 'reset' }
        ]
    };
    inlineModel = { email: 'cipchk@qq.com', name: 'cipchk' };

    constructor(private msg: NzMessageService) {}
}
