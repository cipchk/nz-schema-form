import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';
import { WidgetData } from './../../schema/types';

@Component({
    selector: 'nz-sf-string-widget',
    template: `
  <input *ngIf="type==='hidden'; else notHiddenFieldBlock" type="hidden" [formControl]="control">
  <ng-template #notHiddenFieldBlock>
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
            [attr.type]="type"
            [attr.placeholder]="placeholder"
            [attr.maxLength]="schema.maxLength || null"
            [attr.minLength]="schema.minLength || null"
            [disabled]="disabled"
            [attr.autocomplete]="autocomplete"
            [nzSize]="size">
        <input *ngIf="(schema.widget.id === 'color' && schema.readOnly)"
            type="hidden" [formControl]="control">
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>
  </ng-template>`
})
export class StringWidget extends ControlWidget implements OnInit {
    type: string;
    autocomplete: null;

    ngOnInit(): void {
        const w = this.widgetData;
        this.autocomplete = w.autocomplete || null;
        this.type = w.type || 'text';
    }
}
