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

    model: any = {
        id: 1,
        name: 'test',
        age: 10
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
            'menu': {
                'type': 'object',
                title: 'test',
                'properties': {
                    'id': {
                        'type': 'string',
                        'title': '菜单',
                        span_label: 5,
                        span_control: 5
                    },
                    'title': {
                        'type': 'string',
                        'title': '标题',
                        span_label: 5,
                        span_control: 5
                    }
                }
            }
        },
    };

    constructor(private msg: NzMessageService) {
    }
}
