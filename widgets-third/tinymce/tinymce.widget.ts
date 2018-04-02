import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'nz-schema-form';

@Component({
    selector: 'nz-sf-tinymce-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <tinymce
            [formControl]="control"
            [config]="config"
            [loading]="loading"></tinymce>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class TinymceWidget extends ControlWidget implements OnInit {
    static readonly KEY = 'tinymce';

    config: any;
    loading: string;

    ngOnInit(): void {
        this.loading = this.widgetData.loading || '加载中……';
        this.config = this.widgetData.config || {};
    }

    change(value: any) {
        if (this.widgetData.onContentChange) this.widgetData.onContentChange(value);
        this.formProperty.setValue(value, false);
    }
}
