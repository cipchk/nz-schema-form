import { WidgetRegistry } from '../widget.registry';

import { ObjectWidget } from './object/object.widget';
import { ArrayWidget } from './array/array.widget';
import { ButtonWidget } from './button/button.widget';
import { StringWidget } from './string/string.widget';
import { DateWidget } from './date/date.widget';
import { TextareaWidget } from './textarea/textarea.widget';
import { BooleanWidget } from './boolean/boolean.widget';
import { NumberWidget } from './number/number.widget';
import { CheckboxWidget } from './checkbox/checkbox.widget';

export class NzWidgetRegistry extends WidgetRegistry {
    constructor() {
        super();

        this.register('object', ObjectWidget);
        this.register('array', ArrayWidget);
        this.register('button', ButtonWidget);

        this.register('string', StringWidget);
        this.register('date', DateWidget);
        this.register('boolean', BooleanWidget);
        this.register('number', NumberWidget);
        this.register('checkbox', CheckboxWidget);
        this.register('textarea', TextareaWidget);

        // this.register('text', StringWidget);

        this.setDefaultWidget(StringWidget);
    }
}
