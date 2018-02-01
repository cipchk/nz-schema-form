
```ts
@Component({
    selector: 'demo',
    template: `<nz-sf [schema]="schema" [validators]="validators"></nz-sf>`
})
export class DemoComponent {
    schema = {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
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
            },
            repassword: {
                type: 'string',
                title: '确认密码',
                widget: {
                    type: 'password',
                    placeholder: '请输入密码，且6位以上'
                },
                minLength: 6
            }
        },
        required: ['email', 'password', 'repassword'],
        button: {
            items: [
                {
                    label: '注册',
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

    validators = {
        '/repassword': (value: any, property: FormProperty, form: PropertyGroup) => {
            if (value !== form.properties.password.value) {
                return { message: `确认密码与密码必须相同` };
            }
            return null;
        }
    };
}
```
