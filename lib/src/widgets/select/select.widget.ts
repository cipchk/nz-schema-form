import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlWidget } from '../../widget';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'nz-sf-select-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">

        <nz-select
            [formControl]="control"
            [nzAllowClear]="i.allowClear"
            [nzAutoFocus]="i.autoFocus"
            [nzDisabled]="disabled"
            [nzDropdownStyle]="i.style"
            [nzDropdownClassName]="i.dropdownClassName"
            [nzDropdownMatchSelectWidth]="i.dropdownMatchSelectWidth"
            [nzServerSearch]="i.serverSearch"
            [nzFilterOption]="i.filterOption"
            [nzMaxMultipleCount]="i.maxMultipleCount"
            [nzMode]="i.mode"
            [nzNotFoundContent]="i.notFoundContent"
            [nzPlaceHolder]="placeholder"
            [nzShowSearch]="i.showSearch"
            [nzSize]="size"
            (nzOpenChange)="openChange($event)"
            (nzOnSearch)="searchChange($event)"
            (nzScrollToBottom)="scrollToBottom($event)">
            <nz-option
                *ngFor="let o of data"
                [nzLabel]="o.label"
                [nzValue]="o.value"
                [nzDisabled]="o.disabled">
            </nz-option>
        </nz-select>

        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class SelectWidget extends ControlWidget implements OnInit, OnDestroy {
    i: any;
    data: any[] = [];
    private sc$: Subscription;
    private needSearch = false;

    ngOnInit(): void {
        this.i = {
            allowClear: this.widgetData.allowClear,
            autoFocus: this.widgetData.autoFocus || false,
            style: this.widgetData.style || null,
            dropdownClassName: this.widgetData.dropdownClassName || null,
            dropdownMatchSelectWidth: this.widgetData.dropdownMatchSelectWidth || true,
            serverSearch: this.widgetData.serverSearch || false,
            filterOption: this.widgetData.filterOption,
            maxMultipleCount: this.widgetData.maxMultipleCount || Infinity,
            mode: this.widgetData.mode || 'default',
            notFoundContent: this.widgetData.notFoundContent || '无法找到',
            showSearch: this.widgetData.showSearch
        };

        this.data = this.schema.enum || this.widgetData.data || [];
    }

    searchChange(text: string) {
        if (this.widgetData.nzOnSearch)
            this.widgetData.nzOnSearch(text).then((res: any[]) => this.data = res);
    }

    openChange(value: any) {
        if (this.widgetData.openChange) this.widgetData.openChange(value);
    }

    scrollToBottom(value: any) {
        if (this.widgetData.scrollToBottom) this.widgetData.scrollToBottom(value);
    }

    ngOnDestroy(): void {
        if (this.sc$) this.sc$.unsubscribe();
    }
}
