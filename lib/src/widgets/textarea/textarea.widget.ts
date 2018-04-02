import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-textarea-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <textarea nz-input
            [formControl]="control"
            [attr.id]="id"
            [disabled]="disabled"
            [placeholder]="placeholder"
            [nzSize]="size"
            [nzAutosize]="autosize">
        </textarea>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class TextareaWidget extends ControlWidget implements OnInit {
    autosize: any;
    ngOnInit(): void {
        this.autosize = this.widgetData.autosize || true;
    }
}
