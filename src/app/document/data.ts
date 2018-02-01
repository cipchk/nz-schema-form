
function getMd(md: string) {
    const arr = md.split('---');
    return arr.length > 2 && arr[0] === '' ? arr.slice(2).join('---') : md;
}

export const DATA = {
    basic: [
        {
            id: 'getting-started',
            title: '开始使用',
            content: getMd(require('!!raw-loader!../../../docs/getting-started.md'))
        },
        {
            id: 'schema',
            title: 'Schema',
            content: getMd(require('!!raw-loader!../../../docs/schema.md'))
        },
        {
            id: 'error',
            title: '自定义错误格式',
            content: getMd(require('!!raw-loader!../../../docs/error.md'))
        }
    ],
    widgets: [
        {
            id: 'string',
            title: '字符串',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/string/index.md'))
        },
        {
            id: 'boolean',
            title: '布尔值',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/boolean/index.md'))
        },
        {
            id: 'number',
            title: '数字输入框',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/number/index.md'))
        },
        {
            id: 'textarea',
            title: '多行文本框',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/textarea/index.md'))
        },
        {
            id: 'checkbox',
            title: '多选框',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/checkbox/index.md'))
        },
        {
            id: 'radio',
            title: '单选框',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/radio/index.md'))
        },
        {
            id: 'date',
            title: '日期',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/date/index.md'))
        },
        {
            id: 'date-range',
            title: '日期范围',
            // content: getMd(require('!!raw-loader!../../../lib/src/widgets/date-range/index.md'))
        },
        {
            id: 'time',
            title: '时间',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/time/index.md'))
        },
        {
            id: 'rate',
            title: '评分',
            // content: getMd(require('!!raw-loader!../../../lib/src/widgets/rate/index.md'))
        },
        {
            id: 'select',
            title: '选择器',
            // content: getMd(require('!!raw-loader!../../../lib/src/widgets/select/index.md'))
        },
        {
            id: 'range',
            title: '滑动输入条',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/range/index.md'))
        },
        {
            id: 'file',
            title: '文件上传',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/file/index.md'))
        },
        {
            id: 'cascader',
            title: '级联选择',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/cascader/index.md'))
        },
        {
            id: 'transfer',
            title: '穿梭框',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/transfer/index.md'))
        },
        {
            id: 'tag',
            title: '热门标签',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/tag/index.md'))
        },
        {
            id: 'custom',
            title: '自定义',
            content: getMd(require('!!raw-loader!../../../lib/src/widgets/custom/index.md'))
        }
    ]
};
