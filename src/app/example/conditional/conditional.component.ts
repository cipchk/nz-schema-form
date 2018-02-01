import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema, PropertyGroup, FormProperty } from 'nz-schema-form';

@Component({
    selector: 'app-example-conditional',
    templateUrl: './conditional.component.html'
})
export class ExampleConditionalComponent {
    actions = {
        send: (form: any) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: any) => {
            form.reset({});
        }
    };

    DATA: any = {
        value: {},
        model: { name: 'cipchk' }
    };

    constructor(private msg: NzMessageService) {
        this.DATA.schema = <SFSchema>{
            debug: true,
            properties: {
                type: {
                    type: 'string',
                    title: '登录方式',
                    default: 'mobile',
                    widget: {
                        id: 'radio',
                        style: 'button',
                        selectList: [
                            {
                                label: '手机',
                                value: 'mobile'
                            },
                            {
                                label: '账密',
                                value: 'account'
                            }
                        ]
                    }
                },
                name: {
                    type: 'string',
                    title: '用户名',
                    widget: {
                        placeholder: '请输入用户名，且3位以上'
                    },
                    minLength: 3,
                    visibleIf: {
                        type: ['account']
                    }
                },
                mobile: {
                    type: 'string',
                    title: '手机',
                    widget: {
                        placeholder: '请输入手机'
                    },
                    minLength: 11,
                    maxLength: 11,
                    visibleIf: {
                        type: ['mobile']
                    }
                },
                password: {
                    type: 'string',
                    title: '密码',
                    widget: {
                        type: 'password',
                        placeholder: '请输入密码，且6位以上'
                    },
                    minLength: 6
                }
            },
            required: ['name', 'password'],
            button: {
                items: [
                    {
                        label: '登录',
                        id: 'send',
                        submit: true
                    },
                    {
                        label: '重置',
                        id: 'reset'
                    }
                ]
            }
        };
    }

    demo = require('!!raw-loader!./demo.md');
}
