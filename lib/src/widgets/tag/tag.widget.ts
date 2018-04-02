import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-tag-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-tag
            *ngFor="let i of tags"
            [nzChecked]="i.checked" (nzChange)="handleChange(i)">
            {{i.title}}
        </nz-tag>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
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
