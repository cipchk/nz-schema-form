import { Component } from '@angular/core';
import { ControlWidget } from '../widget';

@Component({
    selector: 'nz-sf-date-widget',
    template: `
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="schema.required" [attr.for]="id">{{ schema.title }}</label>
    </div>
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control" nzHasFeedback>

        <nz-datepicker [nzFormat]="schema.widget.format || 'YYYY-MM-DD'" [nzSize]="schema.widget.size" [nzDisabled]="schema.readOnly" [formControl]="control" [nzPlaceHolder]="schema.placeholder"></nz-datepicker>
        <div nz-form-explain *ngIf="schema.description" [innerHTML]="schema.description"></div>
    </div>`,
    styles: [`
        nz-datepicker {
            width:100%;
        }
    `]
})
export class DateWidget extends ControlWidget {


    ngAfterViewInit(): void {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
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
            const value = newValue.toISOString();   // TODO 如果使用 原始日期类型则会触发类型验证错误。
            this.formProperty.setValue(value, false);
            if (this.schema.debug) console.warn('valueChanges', this.formProperty.path, this.formProperty);
        });
    }


}
