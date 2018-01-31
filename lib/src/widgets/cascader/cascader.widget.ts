import { Component } from '@angular/core';
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
            [nzDisabled]="schema.disabled"
            [nzPlaceHolder]="placeholder"
            [nzShowSearch]="showSearch"
            [nzAllowClear]="allowClear"
            [nzClearText]="clearText"
            [nzShowArrow]="showArrow"
            [nzPopupClassName]="popupClassName"
            [nzColumnClassName]="columnClassName"
            [nzOptions]="data"
            [nzEnableCache]="enableCache"
            [nzExpandTrigger]="expandTrigger"
            [nzChangeOnSelect]="changeOnSelect"
            [nzChangeOn]="changeOn"
            [nzTriggerAction]="triggerAction"
            [nzDisplayRender]="displayRender"
            [nzValueProperty]="valueProperty"
            [nzLabelProperty]="labelProperty"
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
export class CascaderWidget extends ControlWidget {
    get showSearch() {
        return this.widgetData.showSearch;
    }

    get allowClear() {
        return this.widgetData.allowClear;
    }

    get clearText() {
        return this.widgetData.clearText || '清除';
    }

    get showArrow() {
        return this.widgetData.showArrow || true;
    }

    get popupClassName() {
        return this.widgetData.popupClassName;
    }

    get columnClassName() {
        return this.widgetData.columnClassName;
    }

    get data() {
        return this.widgetData.data;
    }

    get enableCache() {
        return this.widgetData.enableCache;
    }

    get expandTrigger() {
        return this.widgetData.expandTrigger;
    }

    get changeOnSelect() {
        return this.widgetData.changeOnSelect;
    }

    get changeOn() {
        return this.widgetData.changeOn;
    }

    get triggerAction() {
        return this.widgetData.triggerAction || ['click'];
    }

    get displayRender() {
        return this.widgetData.displayRender;
    }

    get valueProperty() {
        return this.widgetData.valueProperty;
    }

    get labelProperty() {
        return this.widgetData.labelProperty;
    }

    get visibleChange() {
        return this.widgetData.visibleChange;
    }

    _visibleChange(options: any) {
        if (this.visibleChange) this.visibleChange(options);
    }

    get change() {
        return this.widgetData.change;
    }

    _change(options: any) {
        if (this.change) this.change(options);
    }

    get selectionChange() {
        return this.widgetData.selectionChange;
    }

    _selectionChange(options: any) {
        if (this.selectionChange) this.selectionChange(options);
    }

    get select() {
        return this.widgetData.select;
    }

    _select(options: any) {
        if (this.select) this.select(options);
    }

    get load() {
        return this.widgetData.load;
    }

    _load(options: any) {
        if (this.load) this.load(options);
    }

    get clear() {
        return this.widgetData.clear;
    }

    _clear(options: any) {
        if (this.clear) this.clear(options);
    }
}
