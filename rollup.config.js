const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/router': 'ng.router',
    '@angular/forms': 'ng.forms',
    '@angular/common/http': 'ng.common.http',

    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/operators': 'Rx.Observable.prototype',

    'ng-zorro-antd': 'ngZorro.antd',
    'angular2-schema-form': 'angular2-schema-form',
    'angular2-schema-form/dist/model': 'angular2-schema-form',
    'angular2-schema-form/dist/widgetfactory': 'angular2-schema-form',
    'angular2-schema-form/dist/terminator.service': 'angular2-schema-form'
};

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
        resolve({
            jsnext: true,
            main: true
        })
    ],
    external: Object.keys(globals)
};
