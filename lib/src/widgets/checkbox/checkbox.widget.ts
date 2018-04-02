import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-checkbox-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.span_label" [nzOffset]="schema.offset_control">
        <label nz-checkbox
            [formControl]="control">
            <span [innerHTML]="schema.description"></span>
        </label>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class CheckboxWidget extends ControlWidget {
}
