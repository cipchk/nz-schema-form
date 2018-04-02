import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-number-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-input-number [formControl]="control"
            [attr.name]="id"
            [nzDisabled]="disabled"
            [nzSize]="size"
            [nzMin]="min"
            [nzMax]="max"
            [nzStep]="step"
            [nzFormatter]="formatter"
            [nzParser]="parser"></nz-input-number>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class NumberWidget extends ControlWidget implements OnInit {
    min: number;
    max: number;
    step: number;
    formatter = (value: any) => value;
    parser = (value: any) => value;

    ngOnInit(): void {
        this.min = this.schema.minimum || this.widgetData.min;
        this.max = this.schema.maximum || this.widgetData.max;
        this.step = this.widgetData.step || 1;
        if (this.widgetData.formatter) this.formatter = this.widgetData.formatter;
        if (this.widgetData.parser) this.parser = this.widgetData.parser;
        if (typeof this.schema.default === 'number') {
            this.formProperty.setValue(this.schema.default, true);
        } else if (typeof this.min !== 'undefined') {
            // BUG: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1104
            this.formProperty.setValue(this.min, false);
        }
    }
}
