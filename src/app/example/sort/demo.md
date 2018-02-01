
```ts
@Component({
    selector: 'demo',
    template: `<nz-sf [schema]="schema"></nz-sf>`
})
export class DemoComponent {
    schema = {
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
```
