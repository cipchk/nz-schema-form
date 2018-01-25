import { WidgetRegistry } from 'angular2-schema-form';

import { ObjectWidget } from './object/object.widget';
import { ArrayWidget } from './array/array.widget';
import { ButtonWidget } from './button/button.widget';
import { StringWidget } from './string/string.widget';

export class NzWidgetRegistry extends WidgetRegistry {
    constructor() {
        super();

        this.register('object', ObjectWidget);
        this.register('array', ArrayWidget);
        this.register('button', ButtonWidget);

        this.register('string', StringWidget);
        // this.register('text', StringWidget);

        this.setDefaultWidget(StringWidget);
    }
}
