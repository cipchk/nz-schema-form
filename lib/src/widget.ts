import { AfterViewInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArrayProperty, FormProperty, ObjectProperty } from './model';
import { SFSchema } from './interface';

export abstract class Widget<T extends FormProperty> {
    formProperty: T;
    control: FormControl;
    errorMessages: string[];

    id: string = '';
    name: string = '';
    schema: any = {};
}

/**
 * 小部件基类，一般用于无须校难通知视觉小部件
 */
export class BaseWidget extends Widget<FormProperty> {
    get size() {
        return this.schema.size || 'large';
    }

    @HostBinding('class')
    get cls() {
        return (this.schema as SFSchema).class || '';
    }

    @HostBinding('style')
    get style() {
        return (this.schema as SFSchema).style || '';
    }
}

/**
 * 小部件基类，带数据校验通知
 */
export class ControlWidget extends BaseWidget implements AfterViewInit {
    ngAfterViewInit(): void {
        const control = this.control;
        this.formProperty.valueChanges.subscribe(newValue => {
            if (control.value !== newValue) {
                control.setValue(this.deserialize(newValue), { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe(errors => {
            if (this.schema.debug) console.warn('errorsChanges', this.formProperty.path, errors);
            control.setErrors(errors, { emitEvent: true });
            const messages = (errors || [])
                .filter((e: any) => {
                    return e.path && e.path.slice(1) === this.formProperty.path;
                })
                .map((e: any) => e.message);
            this.errorMessages = messages.filter((m: any, i: any) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe(newValue => {
            this.formProperty.setValue(this.serialize(newValue), false);
            if (this.schema.debug) console.warn('valueChanges', this.formProperty.path, this.formProperty);
        });
    }

    /**
     * 转化控件到数据的值, 如格式处理 date 类型转化成 YYYY-MM-DD 格式, 默认原样返回
     * @param value
     */
    serialize(value: any) {
        return value;
    }

    /**
     * 解析数据传到控件的值，默认原样返回
     * @param value
     */
    deserialize(value: any) {
        return value;
    }
}

export class ArrayLayoutWidget extends Widget<ArrayProperty> implements AfterViewInit {
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.errorsChanges.subscribe(errors => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}

export class ObjectLayoutWidget extends Widget<ObjectProperty> implements AfterViewInit {
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.errorsChanges.subscribe(errors => {
            control.setErrors(errors, { emitEvent: true });
        });
    }
}
