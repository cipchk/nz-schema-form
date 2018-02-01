import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema, PropertyGroup, FormProperty } from 'nz-schema-form';

@Component({
    selector: 'app-example-sort',
    templateUrl: './sort.component.html'
})
export class ExampleSortComponent {
    DATA: any = {
        value: {},
        model: { name: 'cipchk' }
    };

    constructor(private msg: NzMessageService) {
        this.DATA.schema = <SFSchema>{
            debug: true,
            properties: {
                name: {
                    type: 'string',
                    title: '用户名',
                    widget: {
                        placeholder: '请输入用户名，且3位以上'
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
            order: [ 'password', 'name' ]
        };
    }

    demo = require('!!raw-loader!./demo.md');
}
