import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';
import * as moment from 'moment';

@Component({
    selector: 'nz-sf-date-widget',
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
        <nz-datepicker
            [nzFormat]="format"
            [nzSize]="size"
            [nzDisabled]="schema.readOnly"
            [formControl]="control"
            [nzShowTime]="showTime"
            [nzPlaceHolder]="placeholder"></nz-datepicker>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class DateWidget extends ControlWidget implements OnInit {

    format: string;
    showTime: boolean;

    ngOnInit(): void {
        this.format = this.widgetData.format || 'YYYY-MM-DD';
        this.showTime = this.widgetData.showTime === true;
    }

    serialize(value: any) {

        // 如果值是空的则返回空字符串, 空字符串会触发 fallback 外层对象删除此属性。
        if (!value)
            return '';

        // 如果是数字类型则直接返回时间戳
        if (this.schema.type === 'number') {
            return value.getTime();
        }

        // 如果schema 的widget 上存在 format 则使用
        if (this.widgetData['format'])
            return moment(value).format(this.widgetData['format']);

        // 如果schema 上存在 format 则使用
        if (this.schema.format)
            return moment(value).format(this.schema.format);

        const option = this.options.date || {};

        // 若存在 dateFormat 则使用 option 的format;
        const dateFormat = option.format;
        if (dateFormat)
            return moment(value).format(dateFormat);

        // 如果在 provider 设置了转化方法，则调用provider 的转化方法
        const providerSerialize = option.serialize;
        if (providerSerialize && typeof providerSerialize === 'function')
            return providerSerialize(value);

        // 默认采用 如果都没有设置返回 ISO 格式字符串
        if (value instanceof Date) {
            return value.toISOString();
        } else {
            return value
        }
    }

    deserialize(value: string): any {
        if (value) {
            const option = (this.options || { date: null }).date || {};
            const deserialize = option.deserialize;
            if (deserialize && typeof deserialize === 'function')
                return deserialize(value);
            return new Date(value);
        }
        return null;
    }

}
