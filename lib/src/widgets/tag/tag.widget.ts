import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-tag-widget',
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
    <div nz-form-control nz-col
        [nzSpan]="schema.span_control"
        [nzOffset]="schema.offset_control">
        <nz-checkable-tag
            *ngFor="let i of tags"
            [nzChecked]="i.checked" (nzChange)="handleChange(i)">
            {{i.title}}
        </nz-checkable-tag>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class TagWidget extends ControlWidget implements OnInit {

    tags: any[] = [];

    ngOnInit(): void {
        this.tags = this.schema.enum || this.widgetData.tags || [];
        this.updateValue();
    }

    private updateValue() {
        this.formProperty.setValue(this.tags.filter(w => w.checked), false);
    }

    handleChange(item: any) {
        item.checked = !item.checked;
        this.updateValue();
    }
}
