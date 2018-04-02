import { Component, OnInit } from '@angular/core';
import { ObjectLayoutWidget } from '../../widget';

@Component({
  selector: 'nz-sf-object',
  template: `
    <ng-container *ngIf="grid; else noGrid">
        <nz-row [nzGutter]="grid.gutter">
            <ng-container *ngFor="let i of list">
                <ng-container *ngIf="i.property.visible">
                    <nz-col
                        [nzSpan]="i.grid.span" [nzOffset]="i.grid.offset"
                        [nzXs]="i.grid.xs" [nzSm]="i.grid.sm" [nzMd]="i.grid.md"
                        [nzLg]="i.grid.lg" [nzXl]="i.grid.xl" [nzXXl]="i.grid.xxl">
                        <nz-form-item>
                            <nz-sf-item [formProperty]="i.property" [fixed-label]="i.span_label_fixed"></nz-sf-item>
                        </nz-form-item>
                    </nz-col>
                </ng-container>
            </ng-container>
        </nz-row>
    </ng-container>
    <ng-template #noGrid>
        <ng-container *ngFor="let i of list">
            <ng-container *ngIf="i.property.visible">
                <nz-form-item>
                    <nz-sf-item [formProperty]="i.property" [fixed-label]="i.span_label_fixed"></nz-sf-item>
                </nz-form-item>
            </ng-container>
        </ng-container>
    </ng-template>
    `
})
export class ObjectWidget extends ObjectLayoutWidget implements OnInit {
    list: any[] = [];
    grid: any;

    ngOnInit(): void {
        this.grid = this.formProperty.schema.grid;
        const list: any[] = [];
        for (const i of this.formProperty.schema.fieldsets) {
            for (const fid of i.fields) {
                const property = this.formProperty.getProperty(fid);
                const item = {
                    property,
                    grid: property.schema.grid || this.grid || {},
                    span_label_fixed: property.schema.span_label_fixed
                };
                list.push(item);
            }
        }
        this.list = list;
    }
}
