import { Component, OnInit } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';

@Component({
    selector: 'nz-sf-array',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <button nz-button nzType="primary"
            [disabled]="schema.maxItems && $any(formProperty).properties.length >= schema.maxItems"
            (click)="addItem()" [innerHTML]="addTitle"></button>
        <nz-row class="card-list">
            <nz-col [nzSpan]="array_span" *ngFor="let i of formProperty.properties; let idx=index">
                <nz-card>
                    <nz-sf-item *ngIf="i.visible" [formProperty]="i"></nz-sf-item>
                    <button nz-button nzType="danger" (click)="removeItem(idx)" [innerHTML]="removeTitle"></button>
                </nz-card>
            </nz-col>
        </nz-row>
    </nz-form-control>`
})
export class ArrayWidget extends ArrayLayoutWidget implements OnInit {

    addTitle: string;
    removeTitle: string;
    array_span = 8;

    ngOnInit(): void {
        if (this.schema.grid && this.schema.grid.array_span)
            this.array_span = this.schema.grid.array_span;

        this.addTitle = this.widgetData.addTitle || '添加';
        this.removeTitle = this.widgetData.removeTitle || '移除';
    }

    addItem() {
        this.formProperty.addItem();
    }

    removeItem(index: number) {
        this.formProperty.removeItem(index);
    }

    trackByIndex(index: number, item: any) {
        return index;
    }
}
