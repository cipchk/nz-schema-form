# nz-schema-form

[![Build Status](https://travis-ci.org/cipchk/nz-schema-form.svg?branch=master)](https://travis-ci.org/cipchk/nz-schema-form)
[![Dependency Status](https://david-dm.org/cipchk/nz-schema-form/status.svg)](https://david-dm.org/cipchk/nz-schema-form)
[![NPM version](https://img.shields.io/npm/v/nz-schema-form.svg)](https://www.npmjs.com/package/nz-schema-form)

[ng-zorro-antd](https://ng.ant.design/) form generation based on JSON Schema.

## Links

+ [Document 中文版](https://cipchk.github.io/nz-schema-form/#/document/getting-started)
+ [DEMO](https://cipchk.github.io/nz-schema-form/)
+ [stackblitz](https://stackblitz.com/edit/nz-schema-form?file=app%2Fapp.component.ts)

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
| `button` | `nz-button` | cipchk | - | - |
| `boolean` | `nz-switch` | cipchk | - | - |
| `integer` | `nz-input-number` | cipchk | - | - |
| `textarea` | `nz-input` | cipchk | - | - |
| `checkbox` | `nz-checkbox` | cipchk | - | - |
| `radio` | `nz-radio` | canaan | - | - |
| `date` | `nz-datepicker` | viking | - | - |
| `date-range` | `nz-rangepicker` | viking | - | - |
| `time` | `nz-timepicker` | viking | - | - |
| `rate` | `nz-rate` | viking | - | - |
| `select` | `nz-select` | cipchk | - | - |
| `range` | `nz-slider` | cipchk | - | - |
| `file` | `nz-upload` | cipchk | - | - |
| `cascader` | `nz-cascader` | cipchk | - | - |
| `transfer` | `nz-transfer` | cipchk | - | - |
| `tag` | `nz-checkable-tag` | cipchk | - | - |
| `custom` | - | cipchk | - | - |

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/nz-schema-form/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/nz-schema-form/blob/master/LICENSE) file for the full text)
