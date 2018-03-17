import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';
import * as moment from 'moment';

@Component({
    selector: 'nz-sf-date-range-widget',
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
        <nz-rangepicker
            [formControl]="control"
            [nzFormat]="format"
            [nzSize]="size"
            [nzDisabled]="schema.readOnly"
            [nzShowTime]="showTime"
            [nzPlaceholder]="[start, end]">
        </nz-rangepicker>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class DateRangeWidget extends ControlWidget implements OnInit {

    format: string;
    showTime: boolean;
    start: string;
    end: string;
    separator: string;

    ngOnInit(): void {
        this.format = this.widgetData.format || 'YYYY-MM-DD';
        this.showTime = this.widgetData.showTime === true;
        this.start = this.widgetData.start || 'start';
        this.end = this.widgetData.end || 'end';
        this.separator = this.widgetData.separator || '~';
    }

    isNumberFormat() {
        return this.schema && this.schema.items && this.schema.items.type === 'number';
    }

    serialize(value: any[]) {

        const dates = value.filter((date) => {
            return date !== null;
        }).map((date) => {
            if (this.format && !this.isNumberFormat())
                return moment(date).format(this.format);
            if (this.isNumberFormat()) {
                return date.getTime();
            }
            return date;
        });

        if (this.schema.type === 'array') {
            return dates;
        } else {
            if (dates.length) {
                return dates.join(this.separator);
            } else {
                return undefined;
            }
        }
    }

    deserialize(value: any): any {

        if (typeof value === 'string') {
            const values = value.split(this.separator);

            if (values.length === 2) {
                return values.map((entry) => {
                    return moment(entry, this.format).toDate();
                });
            } else {
                return [null, null];
            }
        } else {

            if (!Array.isArray(value) || value.length !== 2) {
                return [null, null];
            }

            if (this.isNumberFormat()) {
                const result = value.map((entry) => {
                    return new Date(entry);
                });
                return result;
            } else {
                return value.map((entry) => {
                    return moment(entry, this.format).toDate();
                });
            }
        }
    }

}
