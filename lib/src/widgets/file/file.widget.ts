import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { ControlWidget } from '../../widget';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'nz-sf-file-widget',
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
        <nz-upload
            [nzFileList]="fileList"
            (nzFileListChange)="change()"
            [nzDisabled]="schema.disabled"
            [nzAction]="action"
            [nzAccept]="accept"
            [nzLimit]="limit"
            [nzSize]="size"
            [nzFileType]="fileType"
            [nzHeaders]="headers"
            [nzListType]="listType"
            [nzMultiple]="multiple"
            [nzName]="argName"
            [nzShowUploadList]="showUploadList"
            [nzWithCredentials]="withCredentials"
            [nzBeforeUpload]="beforeUpload">
            <button nz-button>
                <i class="anticon anticon-upload"></i><span [innerHTML]="buttonText"></span>
            </button>
        </nz-upload>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class FileWidget extends ControlWidget implements OnInit, OnDestroy {
    get buttonText() {
        return this.widgetData[`buttonText`] || '点击上传';
    }

    get action() {
        return this.widgetData[`action`] || '';
    }

    get accept() {
        return this.widgetData[`accept`] || '';
    }

    get limit() {
        return this.widgetData[`limit`] || 0;
    }

    get size() {
        return this.widgetData[`size`] || 0;
    }

    get fileType() {
        return this.widgetData[`fileType`] || '';
    }

    get headers() {
        return this.widgetData[`headers`] || null;
    }

    get listType() {
        return this.widgetData[`listType`] || 'text';
    }

    get multiple() {
        return this.widgetData[`multiple`] || false;
    }

    get argName() {
        return this.widgetData[`argName`] || 'file';
    }

    get showUploadList() {
        return this.widgetData[`showUploadList`] || true;
    }

    get withCredentials() {
        return this.widgetData[`withCredentials`] || false;
    }

    fileList: UploadFile[] = [];

    change() {
        this.fileList = this.fileList.filter(w => !w.status || w.status !== 'removed');
        this.formProperty.setValue(this.fileList, false);
    }

    beforeUpload = (file: UploadFile): boolean => {
        this.fileList.push(file);
        this.change();
        return false;
    }

    private value$: Subscription;
    ngOnInit() {
        this.value$ = this.formProperty.valueChanges.subscribe((val) => {
            if (typeof val === 'string') this.fileList = [];
        });
    }

    ngOnDestroy(): void {
        if (this.value$) this.value$.unsubscribe();
    }
}
