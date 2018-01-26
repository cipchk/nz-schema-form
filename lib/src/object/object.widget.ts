import { Component } from '@angular/core';
import { ObjectLayoutWidget } from 'angular2-schema-form';

@Component({
  selector: 'nz-sf-object',
  template: `
    <ng-container *ngFor="let i of formProperty.schema.fieldsets">
        <ng-container *ngIf="grid; else noGrid">
            <div nz-row [nzGutter]="grid.gutter">
                <div *ngFor="let fid of i.fields" nz-col
                    [nzSpan]="getGrid(fid).span" [nzOffset]="getGrid(fid).offset"
                    [nzXs]="getGrid(fid).xs" [nzSm]="getGrid(fid).sm" [nzMd]="getGrid(fid).md"
                    [nzLg]="getGrid(fid).lg" [nzXl]="getGrid(fid).xl">
                    <div nz-row nz-form-item [ngClass]="{'array-field': isArray(fid)}">
                        <nz-sf-item *ngIf="formProperty.visible" [formProperty]="formProperty.getProperty(fid)"></nz-sf-item>
                    </div>
                </div>
            </div>
        </ng-container>
        <ng-template #noGrid>
            <div *ngFor="let fid of i.fields" nz-row nz-form-item>
                <nz-sf-item *ngIf="formProperty.visible" [formProperty]="formProperty.getProperty(fid)"></nz-sf-item>
            </div>
        </ng-template>
    </ng-container>`
})
export class ObjectWidget extends ObjectLayoutWidget {
    // TODO: no yet ` [nzXXl]="grid.xxl"`
    get grid() {
        return this.formProperty.schema.grid;
    }

    getGrid(fieldId: string) {
        return this.formProperty.getProperty(fieldId).schema.grid || this.grid;
    }

    isArray(fieldId: string) {
        return this.formProperty.getProperty(fieldId).schema.type === 'array';
    }
}
