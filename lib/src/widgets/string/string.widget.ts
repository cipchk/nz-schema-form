import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
import { WidgetData } from './../../schema/types';

@Component({
    selector: 'nz-sf-string-widget',
    template: `
  <input *ngIf="type==='hidden'; else notHiddenFieldBlock" [attr.name]="name" type="hidden" [formControl]="control">
  <ng-template #notHiddenFieldBlock>
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="required" [attr.for]="id">{{ schema.title }}</label>
    </div>
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control" nzHasFeedback>
        <input nz-input
            [formControl]="control"
            [name]="name"
            [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
            [attr.id]="id"
            [attr.type]="type"
            [attr.placeholder]="description"
            [attr.maxLength]="schema.maxLength || null"
            [attr.minLength]="schema.minLength || null"
            [attr.disabled]="(schema.widget.id=='color' && schema.disabled)?true:null"
            [nzSize]="size">
        <input *ngIf="(schema.widget.id==='color' && schema.readOnly)"
            [attr.name]="name" type="hidden" [formControl]="control">
        <div nz-form-extra *ngIf="schema.extra" [innerHTML]="schema.extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>
  </ng-template>`
})
export class StringWidget extends ControlWidget {
    get type() {
        const w = this.widgetData;
        return this.schema.format ? this.schema.format : !w || w.id === 'string' ? 'text' : w.id;
    }
}
