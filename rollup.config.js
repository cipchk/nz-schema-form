const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/router': 'ng.router',
    '@angular/common/http': 'ng.common.http',
    '@angular/forms': 'ng.forms',

    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/operators': 'Rx.Observable.prototype',
    'rxjs/observable/of': 'Rx.Observable',
    'rxjs/observable/zip': 'Rx.Observable',
    'rxjs/observable/fromEvent': 'Rx.Observable',
    'rxjs/observable/FromEventObservable': 'Rx.Observable',
    'rxjs/observable/combineLatest': 'Rx.Observable',

    'ng-zorro-antd': 'ngZorro.antd',
    'z-schema': 'z-schema',

    'date-fns/format': 'date-fns/format/index',
};

const listOfDateFns = [
    'format'
];

const listOfReplace = listOfDateFns.map(name => {
    const map = {};
    map[`import * as ${name}`] = `import ${name}`;
    return replace(map)
});

module.exports = {
    rollup: require('rollup'),
    context: 'this',
    output: {
        file: 'nz-schema-form.umd.js',
        name: 'nz-schema-form',
        format: 'umd',
        sourcemap: true,
        globals: globals
    },
    plugins: [
        ...listOfReplace,
        resolve({
            jsnext: true,
            main: true
        })
    ],
    external: Object.keys(globals)
};
