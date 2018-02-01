import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlWidget } from '../../widget';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'nz-sf-select-widget',
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
        [nzOffset]="schema.offset_control" *ngIf="i && type > 0">
        <ng-container [ngSwitch]="type">
            <nz-select *ngSwitchDefault
                [formControl]="control"
                [ngStyle]="i.style"
                [nzSize]="size"
                [nzDisabled]="schema.disabled"
                [nzMode]="i.mode"
                [nzFilter]="i.filter"
                [nzKeepUnListOptions]="i.keepUnListOptions"
                [nzAllowClear]="i.allowClear"
                [nzPlaceHolder]="placeholder"
                [nzNotFoundContent]="i.notFoundContent"
                (nzOpenChange)="openChange($event)"
                (nzSearchChange)="searchChange($event)"
                (nzScrollToBottom)="scrollToBottom($event)">
                <nz-option
                    *ngFor="let o of data"
                    [nzLabel]="o.label"
                    [nzValue]="o.value"
                    [nzDisabled]="o.disabled">
                </nz-option>
            </nz-select>
            <nz-select *ngSwitchCase="'2'"
                [formControl]="control"
                [ngStyle]="i.style"
                [nzSize]="size"
                [nzDisabled]="schema.disabled"
                [nzFilter]="i.filter"
                [nzAllowClear]="i.allowClear"
                [nzPlaceHolder]="placeholder"
                [nzNotFoundContent]="i.notFoundContent"
                nzShowSearch
                (nzOpenChange)="openChange($event)"
                (nzSearchChange)="searchChange($event)"
                (nzScrollToBottom)="scrollToBottom($event)">
                <nz-option
                    *ngFor="let o of data"
                    [nzLabel]="o.label"
                    [nzValue]="o.value"
                    [nzDisabled]="o.disabled">
                </nz-option>
            </nz-select>
            <nz-select *ngSwitchCase="'3'"
                [formControl]="control"
                [ngStyle]="i.style"
                [nzSize]="size"
                [nzDisabled]="schema.disabled"
                nzTags
                nzShowSearch
                [nzAllowClear]="i.allowClear"
                [nzPlaceHolder]="placeholder"
                [nzNotFoundContent]="i.notFoundContent"
                (nzOpenChange)="openChange($event)"
                (nzSearchChange)="searchChange($event)"
                (nzScrollToBottom)="scrollToBottom($event)">
                <nz-option
                    *ngFor="let o of data"
                    [nzLabel]="o.label"
                    [nzValue]="o.value"
                    [nzDisabled]="o.disabled">
                </nz-option>
            </nz-select>
        </ng-container>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class SelectWidget extends ControlWidget implements OnInit, OnDestroy {
    selectedMultipleOption;
    i: any;
    type = 0;
    data: any[] = [];
    private sc$: Subscription;
    private needSearch = false;

    ngOnInit(): void {
        this.i = {
            style: this.widgetData.style || null,
            mode: this.widgetData.mode || undefined,
            filter: this.widgetData.filter || undefined,
            keepUnListOptions: this.widgetData.keepUnListOptions || undefined,
            allowClear: this.widgetData.allowClear || undefined,
            showSearch: this.widgetData.showSearch || undefined,
            notFoundContent: this.widgetData.notFoundContent || '无法找到',
            tags: this.widgetData.tags || undefined
        };

        this.type = 1;
        if (this.i.showSearch === true)
            this.type = 2;
        if (this.i.tags === true)
            this.type = 3;

        this.data = this.widgetData.data || [];
        this.needSearch = !!this.widgetData.searchChange;
    }

    searchChange(text: string) {
        if (!this.needSearch) return ;
        this.widgetData.searchChange(text).then((res: any[]) => this.data = res);
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
