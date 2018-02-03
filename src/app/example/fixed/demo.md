```ts
import { Component } from '@angular/core';
import { SFSchema } from 'nz-schema-form';

@Component({
    selector: 'app-example-fixed',
    templateUrl: './fixed.component.html'
})
export class ExampleFixedComponent {

    schema: SFSchema = {
        debug: true,
        span_label_fixed: 100,
        grid: { span: 8 },
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                description: '请输入邮箱，最多20个字符',
                showDescription: true,
                maxLength: 20
            },
            firstname: {
                type: 'string',
                title: '姓'
            },
            lastname: {
                type: 'string',
                title: '名'
            },
            age: {
                type: 'number',
                title: '年龄',
                widget: {
                    id: 'number',
                    min: 18
                },
                grid: { span: 16 }
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
                },
                grid: { span: 24 }
            },
            birthday: {
                type: 'number',
                title: '生日',
                widget: 'date',
                grid: { span: 12 }
            },
            birthday1: {
                type: 'number',
                title: '生日',
                widget: 'date',
                grid: { span: 12 }
            }
        }
    };

    demo = require('!!raw-loader!./demo.md');
}
```
