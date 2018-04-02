import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-date-range-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">

        <input nz-input
            [formControl]="control"
            [attr.id]="id"
            [attr.placeholder]="placeholder"
            [attr.maxLength]="schema.maxLength || null"
            [attr.minLength]="schema.minLength || null"
            [disabled]="disabled"
            [nzSize]="size">

        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class DateRangeWidget extends ControlWidget implements OnInit {

//     <nz-rangepicker
//     [formControl]="control"
//     [nzFormat]="format"
//     [nzSize]="size"
//     [nzDisabled]="disabled"
//     [nzShowTime]="showTime"
//     [nzPlaceholder]="[start, end]">
// </nz-rangepicker>
    format: string;
    showTime: boolean;
    start: string;
    end: string;

    ngOnInit(): void {
        this.format = this.widgetData.format || 'YYYY-MM-DD';
        this.showTime = this.widgetData.showTime === true;
        this.start = this.widgetData.start || 'start';
        this.end = this.widgetData.end || 'end';
    }

    serialize(value: any) {
        return value;  // TODO should parse value to different type;
    }

    deserialize(value: string): any {
        return value;  // TODO
    }

}
