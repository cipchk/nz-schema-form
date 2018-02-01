import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-radio-widget',
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
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
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
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class RadioWidget extends ControlWidget implements OnInit {
    data: any[] = [];

    ngOnInit(): void {
        const list: any[] = this.widgetData.selectList || [];
        if (this.schema.disabled === true) {
            this.data = list.map(i => i.disabled = true);
        } else {
            this.data = list;
        }
    }

    get defaultStyle() {
        return (this.widgetData.style || 'default') === 'default';
    }
}
