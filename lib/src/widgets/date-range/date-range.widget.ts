import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
import * as moment from 'moment';
import { SchemaFormOptions } from '../../../schema-form.options';

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
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control" nzHasFeedback>

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
    </div>`,
    styles: [`
        nz-datepicker {
            width:100%;
        }
    `]
})
export class DateRangeWidget extends ControlWidget {

    get format() {
        return this.widgetData.format || 'YYYY-MM-DD';
    }

    get showTime() {
        return this.widgetData.showTime === true;
    }

    get start() {
        return this.widgetData.start || 'start';
    }

    get end() {
        return this.widgetData.end || 'end';
    }

    serialize(value: any) {
        return value;  // TODO should parse value to different type;
    }

    deserialize(value: string): any {
        return value;  // TODO
    }

}
