import { Component, ViewChild } from '@angular/core';
import { SFSchema, FormComponent } from '../index';

@Component({
    template: `
    <nz-sf #comp [schema]="schema" [model]="model"></nz-sf>
    `
})
export class TestComponent {
    @ViewChild('comp') comp: FormComponent;
    model = { email: 'cipchk@qq.com' };
    schema = <SFSchema>{
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                description: '请输入邮箱，最多20个字符',
                showDescription: true,
                maxLength: 20,
                widget: {
                    id: 'string'
                }
            }
        }
    };
}
