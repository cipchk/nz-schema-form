import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-textarea-widget',
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
        <nz-input
            [formControl]="control"
            [nzId]="id"
            nzType="textarea"
            [nzDisabled]="schema.readOnly"
            [nzPlaceHolder]="placeholder"
            [nzSize]="size"
            [nzAutosize]="autosize"
            [nzRows]="rows"></nz-input>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class TextareaWidget extends ControlWidget implements OnInit {
    autosize: any;
    rows: any;
    ngOnInit(): void {
        this.autosize = this.widgetData.autosize || true;
        this.rows = this.widgetData.rows || null;
    }
}
