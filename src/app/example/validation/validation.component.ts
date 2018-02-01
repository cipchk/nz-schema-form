import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema, PropertyGroup, FormProperty } from 'nz-schema-form';

@Component({
    selector: 'app-example-validation',
    templateUrl: './validation.component.html'
})
export class ExampleValidationComponent {
    actions = {
        send: (form: any) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: any) => {
            form.reset({});
        }
    };

    DATA: any = {
        register: {
            code: '' + require('!!raw-loader!../../schema/register-schema.json'),
            value: {},
            model: { email: 'cipchk@qq.com' }
        }
    };

    validators = {
        '/repassword': (value: any, property: FormProperty, form: PropertyGroup) => {
            if (value !== form.properties.password.value) {
                return { message: `确认密码与密码必须相同` };
            }
            return null;
        }
    };

    constructor(private msg: NzMessageService) {
        Object.keys(this.DATA).forEach(key => {
            this.DATA[key]['schema'] = JSON.parse(this.DATA[key]['code']);
        });
    }

    demo = require('!!raw-loader!./demo.md');
}
