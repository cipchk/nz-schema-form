import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-range-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-slider
            [formControl]="control"
            [nzRange]="widgetData.range"
            [nzMin]="min"
            [nzMax]="max"
            [nzStep]="step"
            [nzMarks]="marks"
            [nzDots]="widgetData.dots"
            [nzIncluded]="included"
            [nzDisabled]="disabled"
            [nzVertical]="widgetData.vertical"
            [nzTipFormatter]="_formatter"
            (nzOnAfterChange)="_afterChange($event)">
        </nz-slider>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
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
