import { AfterViewInit } from '@angular/core';
import { Widget } from 'angular2-schema-form';
import { FormProperty } from 'angular2-schema-form/dist/model';

export class ControlWidget extends Widget<FormProperty> implements AfterViewInit {

    get size() {
        return this.schema.size || 'large';
    }

    ngAfterViewInit(): void {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, {emitEvent: false});
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            if (this.schema.debug) console.warn('errorsChanges', this.formProperty.path, errors);
            control.setErrors(errors, { emitEvent: true });
            const messages = (errors || [])
                .filter((e: any) => {
                    return e.path && e.path.slice(1) === this.formProperty.path;
                })
                .map((e: any) => e.message);
            this.errorMessages = messages.filter((m: any, i: any) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
            if (this.schema.debug) console.warn('valueChanges', this.formProperty.path, this.formProperty);
        });
    }
}
