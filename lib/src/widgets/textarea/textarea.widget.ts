import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-textarea-widget',
    template: `
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="required" [attr.for]="id">{{ schema.title }}</label>
    </div>
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control" nzHasFeedback>
        <nz-input
            [formControl]="control"
            [nzId]="id"
            nzType="textarea"
            [nzReadonly]="schema.readOnly"
            [nzDisabled]="schema.disabled"
            [nzPlaceHolder]="description"
            [nzSize]="size"
            [nzAutosize]="autosize"
            [nzRows]="rows"></nz-input>
        <div nz-form-extra *ngIf="schema.extra" [innerHTML]="schema.extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class TextareaWidget extends ControlWidget {
    get autosize() {
        return this.widgetData[`autosize`] || true;
    }

    get rows() {
        return this.widgetData[`rows`] || null;
    }
}
