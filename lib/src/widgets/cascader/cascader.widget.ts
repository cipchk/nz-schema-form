import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-cascader-widget',
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
        <nz-cascader
            [formControl]="control"
            [nzSize]="size"
            [nzDisabled]="schema.readOnly"
            [nzPlaceHolder]="placeholder"
            [nzShowSearch]="widgetData.showSearch"
            [nzAllowClear]="widgetData.allowClear"
            [nzClearText]="clearText"
            [nzShowArrow]="showArrow"
            [nzPopupClassName]="widgetData.popupClassName"
            [nzColumnClassName]="widgetData.columnClassName"
            [nzOptions]="widgetData.data"
            [nzEnableCache]="widgetData.enableCache"
            [nzExpandTrigger]="widgetData.expandTrigger"
            [nzChangeOnSelect]="widgetData.changeOnSelect"
            [nzChangeOn]="widgetData.changeOn"
            [nzTriggerAction]="triggerAction"
            [nzDisplayRender]="widgetData.displayRender"
            [nzValueProperty]="widgetData.valueProperty"
            [nzLabelProperty]="widgetData.labelProperty"
            (nzVisibleChange)="_visibleChange($event)"
            (nzChange)="_change($event)"
            (nzSelectionChange)="_selectionChange($event)"
            (nzSelect)="_select($event)"
            (nzLoad)="_load($event)"
            (nzClear)="_clear($event)">
        </nz-cascader>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class CascaderWidget extends ControlWidget implements OnInit {

    clearText: string;
    showArrow: boolean;
    triggerAction: string[];

    ngOnInit(): void {
        this.clearText = this.widgetData.clearText || '清除';
        this.showArrow = this.widgetData.showArrow || true;
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

    _load(options: any) {
        if (this.widgetData.load) this.widgetData.load(options);
    }

    _clear(options: any) {
        if (this.widgetData.clear) this.widgetData.clear(options);
    }
}
