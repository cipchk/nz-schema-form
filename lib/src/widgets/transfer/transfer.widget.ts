import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-transfer-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-transfer
            [nzDataSource]="_dataSource"
            [nzTitles]="titles"
            [nzOperations]="operations"
            [nzListStyle]="widgetData.listStyle"
            [nzItemUnit]="itemUnit"
            [nzItemsUnit]="itemsUnit"
            [nzShowSearch]="widgetData.showSearch"
            [nzFilterOption]="widgetData.filterOption"
            [nzSearchPlaceholder]="widgetData.searchPlaceholder"
            [nzNotFoundContent]="widgetData.notFoundContent"
            [nzCanMove]="_canMove"
            (nzChange)="_change($event)"
            (nzSearchChange)="_searchChange($event)"
            (nzSelectChange)="_selectChange($event)">
        </nz-transfer>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class TransferWidget extends ControlWidget implements OnInit {

    _dataSource: any[] = [];
    titles: string[];
    operations: string[];
    itemUnit: string;
    itemsUnit: string;
    private _data: any[] = [];

    ngOnInit(): void {
        this.titles = this.widgetData.titles || ['', ''];
        this.operations = this.widgetData.operations || ['', ''];
        this.itemUnit = this.widgetData.itemUnit || '项目';
        this.itemsUnit = this.widgetData.itemsUnit || '项目';
        this._dataSource = this.schema.enum || this.widgetData.dataSource || [];
        this._data = this._dataSource.filter(w => w.direction === 'right');
        this.updateValue();
    }

    private updateValue() {
        this.formProperty.setValue(this._data, false);
    }

    _canMove = (arg: any): Observable<any[]> => {
        return this.widgetData.canMove ? this.widgetData.canMove(arg) : of(arg.list);
    }

    _change(options: any) {
        if (options.to === 'right') {
            this._data = this._data.concat(...options.list);
        } else {
            this._data = this._data.filter(w => options.list.indexOf(w) === -1);
        }
        if (this.widgetData.change) this.widgetData.change(options);
        this.updateValue();
    }

    _searchChange(options: any) {
        if (this.widgetData.searchChange) this.widgetData.searchChange(options);
    }

    _selectChange(options: any) {
        if (this.widgetData.selectChange) this.widgetData.selectChange(options);
    }
}
