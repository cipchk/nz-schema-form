import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-radio-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-radio-group *ngIf="defaultStyle; else button"
            [formControl]="control"
            [nzSize]="size">
            <label *ngFor="let option of data"
                nz-radio
                [nzValue]="option.value"
                [nzDisabled]="option.disabled">
                <span [innerHTML]="option.label"></span>
            </label>
        </nz-radio-group>
        <ng-template #button>
            <nz-radio-group
                [formControl]="control"
                [nzSize]="size">
                <label *ngFor="let option of data"
                    nz-radio-button
                    [nzValue]="option.value"
                    [nzDisabled]="option.disabled">
                    <span [innerHTML]="option.label"></span>
                </label>
            </nz-radio-group>
        </ng-template>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class RadioWidget extends ControlWidget implements OnInit {
    data: any[] = [];
    defaultStyle: boolean;

    ngOnInit(): void {
        this.defaultStyle = (this.widgetData.style || 'default') === 'default';
        const list: any[] = this.schema.enum || this.widgetData.selectList || [];
        if (this.schema.readOnly === true) {
            this.data = list.map(i => i.disabled = true);
        } else {
            this.data = list;
        }
    }

}
