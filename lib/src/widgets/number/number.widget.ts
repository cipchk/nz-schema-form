import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-number-widget',
    template: `
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="required" [attr.for]="id">
            <span>
                {{ schema.title }}
                <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
                    <i nz-tooltip class="anticon anticon-question-circle-o"></i>
                </nz-tooltip>
            </span>
        </label>
    </div>
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-input-number [formControl]="control"
            [nzPlaceHolder]="placeholder"
            [nzDisabled]="schema.readOnly"
            [nzSize]="size"
            [nzMin]="min"
            [nzMax]="max"
            [nzStep]="step"
            [nzAllowClear]="allowClear"
            [nzFormatter]="formatter"
            [nzParser]="parser"></nz-input-number>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class NumberWidget extends ControlWidget {
    get min() {
        return this.widgetData[`min`] || -Infinity;
    }

    get max() {
        return this.widgetData[`max`] || Infinity;
    }

    get step() {
        return this.widgetData[`step`] || 1;
    }

    get allowClear() {
        return this.widgetData[`allowClear`] || false;
    }

    get formatter() {
        return this.widgetData[`formatter`] || ((value: any) => value);
    }

    get parser() {
        return this.widgetData[`parser`] || ((value: any) => value);
    }
}
