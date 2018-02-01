import { WidgetRegistry } from '../widget.registry';

import { ObjectWidget } from './object/object.widget';
import { ArrayWidget } from './array/array.widget';
import { ButtonWidget } from './button/button.widget';
import { StringWidget } from './string/string.widget';
import { DateWidget } from './date/date.widget';
import { TimeWidget } from './time/time.widget';
import { TextareaWidget } from './textarea/textarea.widget';
import { BooleanWidget } from './boolean/boolean.widget';
import { NumberWidget } from './number/number.widget';
import { CheckboxWidget } from './checkbox/checkbox.widget';
import { FileWidget } from './file/file.widget';
import { CascaderWidget } from './cascader/cascader.widget';
import { CustomWidget } from './custom/custom.widget'; 
import { TransferWidget } from './transfer/transfer.widget';
import { RangeWidget } from './range/range.widget';
import { RadioWidget } from './radio/radio.widget';
import { TagWidget } from './tag/tag.widget';

export class NzWidgetRegistry extends WidgetRegistry {
    constructor() {
        super();

        this.register('object', ObjectWidget);
        this.register('array', ArrayWidget);
        this.register('button', ButtonWidget);

        this.register('string', StringWidget);
        this.register('radio',RadioWidget)
        this.register('date', DateWidget);
        this.register('time', TimeWidget);
        this.register('boolean', BooleanWidget);
        this.register('number', NumberWidget);
        this.register('checkbox', CheckboxWidget);
        this.register('textarea', TextareaWidget);
        this.register('file', FileWidget);
        this.register('cascader', CascaderWidget);
        this.register('transfer', TransferWidget);
        this.register('range', RangeWidget);
        this.register('tag', TagWidget);

        this.register('custom', CustomWidget);

        this.setDefaultWidget(StringWidget);
    }
}
