import { Component, OnInit } from '@angular/core';
import * as format from 'date-fns/format';
import { ControlWidget } from '../../widget';
import { SchemaFormOptions } from '../../schema-form.options';

@Component({
    selector: 'nz-sf-time-widget',
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
export class TimeWidget extends ControlWidget implements OnInit {
    // <nz-timepicker
    // [formControl]="control"
    // [nzSize]="size"
    // [nzPlaceHolder]="placeholder"
    // [nzDisabled]="disabled"
    // [nzFormat]="format"
    // [nzDisabledHours]="widgetData.disabledHours"
    // [nzDisabledMinutes]="widgetData.disabledMinutes"
    // [nzDisabledSeconds]="widgetData.disabledSeconds"
    // [nzHideDisabledOptions]="hideDisabledOptions"></nz-timepicker>
    format: string;
    hideDisabledOptions: boolean;

    ngOnInit(): void {
        this.format = this.widgetData.format || 'HH:mm:ss';
        this.hideDisabledOptions = this.widgetData.hideDisabledOptions === true;
    }

    // TODO should extend date widget, but need refactor
    serialize(value: any) {

        // 如果值是空的则返回空字符串, 空字符串会触发 fallback 外层对象删除此属性。
        if (!value)
            return '';

        // 如果是数字类型则直接返回时间戳
        if (this.schema.type === 'number') {
            return value.getTime();
        }

        // 如果schema 的widget 上存在 format 则使用
        if (this.format)
            return format(value, this.format);


        // 如果schema 上存在 format 则使用
        if (this.schema.format)
            return format(value, this.schema.format);

        const option = this.options.date || {};

        // 若存在 dateFormat 则使用 option 的format;
        const dateFormat = option.format;
        if (dateFormat)
            return format(value, dateFormat);

        // 如果在 provider 设置了转化方法，则调用provider 的转化方法
        const providerSerialize = option.serialize;
        if (providerSerialize && typeof providerSerialize === 'function')
            return providerSerialize(value);

        // 默认采用 如果都没有设置返回 ISO 格式字符串
        if (value instanceof Date) {
            return value.toISOString();

        } else {
            return value;
        }
    }

    deserialize(value: string): any {
        if (value) {
            const option: SchemaFormOptions = this.options.time;

            const deserialize = option.deserialize;
            if (deserialize && typeof deserialize === 'function')
                return deserialize(value);

            if (this.schema.type === 'number')
                return value;

            return format(value, this.format);
        }
        return null;
    }

}
