import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-range-widget',
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
    <div nz-form-control nz-col
        [nzSpan]="schema.span_control"
        [nzOffset]="schema.offset_control">
        <nz-slider
            [formControl]="control"
            [nzRange]="widgetData.range"
            [nzMin]="min"
            [nzMax]="max"
            [nzStep]="step"
            [nzMarks]="marks"
            [nzDots]="widgetData.dots"
            [nzIncluded]="included"
            [nzDisabled]="schema.readOnly"
            [nzVertical]="widgetData.vertical"
            [nzTipFormatter]="_formatter"
            (nzOnAfterChange)="_afterChange($event)">
        </nz-slider>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class RangeWidget extends ControlWidget implements OnInit {

    min: number;
    max: number;
    step: number;
    marks: any;
    included: boolean;

    ngOnInit(): void {
        this.min = this.schema.minimum || this.widgetData.min || 0;
        this.max = this.schema.maximum || this.widgetData.max || 100;
        this.step = this.widgetData.step || 1;
        this.marks = this.widgetData.marks || null;

        const included = this.widgetData.included;
        this.included = typeof included === 'undefined' ? true : included;
    }

    _formatter = (value: any) => {
        if (this.widgetData.formatter) return this.widgetData.formatter(value);
        return value;
    }

    _afterChange(value: any) {
        if (this.widgetData.afterChange) this.widgetData.afterChange(value);
    }
}
