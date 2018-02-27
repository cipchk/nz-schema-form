import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';
import { WidgetData } from './../../schema/types';

@Component({
    selector: 'nz-sf-string-widget',
    template: `
  <input *ngIf="type==='hidden'; else notHiddenFieldBlock" [attr.name]="name" type="hidden" [formControl]="control">
  <ng-template #notHiddenFieldBlock>
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
        <input nz-input
            [formControl]="control"
            [name]="name"
            [attr.id]="id"
            [attr.type]="type"
            [attr.placeholder]="placeholder"
            [attr.maxLength]="schema.maxLength || null"
            [attr.minLength]="schema.minLength || null"
            [attr.disabled]="(schema.widget.id=='color' && schema.readOnly)?true:null"
            [attr.autocomplete]="autocomplete"
            [nzSize]="size">
        <input *ngIf="(schema.widget.id==='color' && schema.readOnly)"
            [attr.name]="name" type="hidden" [formControl]="control">
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>
  </ng-template>`
})
export class StringWidget extends ControlWidget implements OnInit {
    type: string;
    autocomplete: null;

    ngOnInit(): void {
        const w = this.widgetData;
        if (w.type) return w.type;
        this.type = !w || w.id === 'string' ? 'text' : w.id;
        this.autocomplete = w.autocomplete || null;
    }
}
