import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-cascader-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-cascader
            [formControl]="control"
            [nzAllowClear]="widgetData.allowClear"
            [nzAutoFocus]="widgetData.autoFocus"
            [nzChangeOn]="widgetData.changeOn"
            [nzChangeOnSelect]="widgetData.changeOnSelect"
            [nzColumnClassName]="widgetData.columnClassName"
            [nzDisabled]="disabled"
            [nzExpandTrigger]="widgetData.expandTrigger"
            [nzMenuClassName]="widgetData.menuClassName"
            [nzMenuStyle]="widgetData.nzMenuStyle"
            [nzLabelProperty]="widgetData.labelProperty"
            [nzValueProperty]="widgetData.valueProperty"
            [nzLoadData]="widgetData.load"
            [nzOptions]="widgetData.data"
            [nzPlaceHolder]="placeholder"
            [nzShowArrow]="showArrow"
            [nzShowInput]="showInput"
            [nzSize]="size"
            (ngModelChange)="_change($event)"
            (nzClear)="_clear($event)"
            (nzVisibleChange)="_visibleChange($event)"
            (nzSelect)="_select($event)"
            (nzSelectionChange)="_selectionChange($event)">
        </nz-cascader>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class CascaderWidget extends ControlWidget implements OnInit {

    clearText: string;
    showArrow: boolean;
    showInput: boolean;
    triggerAction: string[];

    ngOnInit(): void {
        this.clearText = this.widgetData.clearText || '清除';
        this.showArrow = this.widgetData.showArrow || true;
        this.showInput = this.widgetData.showInput || true;
        this.triggerAction = this.widgetData.triggerAction || ['click'];
    }

    _visibleChange(options: any) {
        if (this.widgetData.visibleChange) this.widgetData.visibleChange(options);
    }

    _change(options: any) {
        if (this.widgetData.change) this.widgetData.change(options);
    }

    _selectionChange(options: any) {
        if (this.widgetData.selectionChange) this.widgetData.selectionChange(options);
    }

    _select(options: any) {
        if (this.widgetData.select) this.widgetData.select(options);
    }

    _clear(options: any) {
        if (this.widgetData.clear) this.widgetData.clear(options);
    }
}
