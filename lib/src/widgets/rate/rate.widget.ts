import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-rate-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">

        <nz-rate
            [formControl]="control"
            [nzAllowClear]="allowClear"
            [nzAllowHalf]="allowHalf"
            [nzAutoFocus]="autoFocus"
            [nzCount]="count"
            [nzDisabled]="disabled"></nz-rate>

        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class RateWidget extends ControlWidget implements OnInit {
    count: number;
    allowHalf: boolean;
    allowClear: boolean;
    autoFocus: boolean;
    ngOnInit(): void {
        this.count = this.widgetData.count || 5;
        this.allowHalf = this.widgetData.allowHalf || false;
        this.allowClear = this.widgetData.allowClear || true;
        this.autoFocus = this.widgetData.autoFocus || false;
    }
}
