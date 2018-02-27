import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema } from 'nz-schema-form';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
    value: any;

    actions = {
        send: (form: any) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: any) => {
            form.reset({});
        }
    };

    schema = {
        debug: true,
        properties: {
            name: {
                type: 'string',
                title: '用户名',
                widget: {
                    placeholder: '请输入用户名，且3位以上',
                    autocomplete: 'off'
                },
                minLength: 3
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

    constructor(private msg: NzMessageService) {
    }
}
