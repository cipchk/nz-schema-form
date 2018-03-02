import { Component, OnInit } from '@angular/core';
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
export class NumberWidget extends ControlWidget implements OnInit {
    min: number;
    max: number;
    step: number;
    allowClear: boolean;
    formatter = (value: any) => value;
    parser = (value: any) => value;

    ngOnInit(): void {
        this.min = this.schema.minimum || this.widgetData.min || -Infinity;
        this.max = this.schema.maximum || this.widgetData.max || Infinity;
        this.step = this.widgetData.step || 1;
        this.allowClear = this.widgetData.allowClear || false;
        if (this.widgetData.formatter) this.formatter = this.widgetData.formatter;
        if (this.widgetData.parser) this.parser = this.widgetData.parser;
        if (typeof this.schema.default === 'number')
            this.formProperty.setValue(this.schema.default, true);
        else if (typeof this.min === 'number')
            this.formProperty.setValue(this.min, true);
    }
}
