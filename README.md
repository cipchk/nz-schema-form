# nz-schema-form [![NPM version](https://img.shields.io/npm/v/nz-schema-form.svg)](https://www.npmjs.com/package/nz-schema-form)

[ng-zorro-antd](https://ng.ant.design/) form generation based on JSON Schema.

## TODO

By data type, all the available widgets contains listed below:

- **string**: string, text, textarea, search, url, email, password, select, radio
- **number**: number, integer, range
- **boolean**: boolean, checkbox
- **date**: date, date-rang, time
- **other**: rate, file, cascader, transfer

| widget | zorro component | assigned | testing | status |
| ------ | --------------- | -------- | ------ | ------ |
| `object` | - | cipchk | - | - |
| `array` | - | cipchk | - | - |
| `string` | - | cipchk | - | - |
| `boolean` | `nz-switch` | - | - | - |
| `integer` | `nz-input-number` | - | - | - |
| `button` | `nz-button` | - | - | - |
| `textarea` | `nz-input` | - | - | - |
| `checkbox` | `nz-checkbox` | - | - | - |
| `radio` | `nz-radio` | - | - | - |
| `date` | `nz-datepicker` | - | - | - |
| `date-range` | `nz-rangepicker` | - | - | - |
| `time` | `nz-timepicker` | - | - | - |
| `rate` | `nz-rate` | - | - | - |
| `select` | `nz-select` | - | - | - |
| `range` | `nz-slider` | - | - | - |
| `file` | `nz-upload` | - | - | - |
| `cascader` | `nz-cascader` | - | - | - |
| `transfer` | `nz-transfer` | - | - | - |

## Installation instructions

Install `nz-schema-form` from `npm`

```bash
npm install nz-schema-form --save
```

Import the `nz-schema-form` in to your root `AppModule`.

```typescript
import { NzSchemaFormModule } from 'nz-schema-form';

@NgModule({
    imports: [
        NzSchemaFormModule.forRoot()
    ]
})
export class AppModule { }
```

### Usage

```ts
```

### How to use it with:

+ `angular-cli` please refer to **Installation instructions**.
+ `stackblitz` sample available [here](https://stackblitz.com/edit/nz-schema-form-setup?file=app%2Fapp.component.ts).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/nz-schema-form/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/nz-schema-form/blob/master/LICENSE) file for the full text)
