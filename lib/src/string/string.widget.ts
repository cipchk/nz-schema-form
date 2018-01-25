import { Component } from '@angular/core';
import { ControlWidget } from '../widget';

@Component({
    selector: 'nz-sf-string-widget',
    template: `
  <input *ngIf="type==='hidden'; else notHiddenFieldBlock" [attr.name]="name" type="hidden" [formControl]="control">
  <ng-template #notHiddenFieldBlock>
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="schema.required" [attr.for]="id">{{ schema.title }}</label>
    </div>
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control" nzHasFeedback>
        <input nz-input
            [formControl]="control"
            [name]="name"
            [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
            [attr.type]="type"
            [attr.id]="id"
            [attr.placeholder]="schema.placeholder"
            [attr.maxLength]="schema.maxLength || null"
            [attr.minLength]="schema.minLength || null"
            [attr.disabled]="(schema.widget.id=='color' && schema.readOnly)?true:null"
            [nzSize]="size">
        <input *ngIf="(schema.widget.id==='color' && schema.readOnly)"
            [attr.name]="name" type="hidden" [formControl]="control">
        <div nz-form-explain *ngIf="schema.description" [innerHTML]="schema.description"></div>
    </div>
  </ng-template>`
})
export class StringWidget extends ControlWidget {
    get type() {
        const w = this.schema.widget;
        return w && w.format ? w.format : !w || w.id === 'string' ? 'text' : w.id;
    }
}
