import { Component } from '@angular/core';
import { ObjectLayoutWidget } from 'angular2-schema-form';

@Component({
  selector: 'nz-sf-object',
  template: `
  <ng-container *ngIf="formProperty.schema.layout !== 'inline'; else inline">
    <ng-container *ngFor="let i of formProperty.schema.fieldsets">
        <ng-container *ngFor="let fieldId of i.fields">
            <nz-sf-item *ngIf="formProperty.visible" [formProperty]="formProperty.getProperty(fieldId)"></nz-sf-item>
        </ng-container>
    </ng-container>
  </ng-container>
  <ng-template #inline>
    <div *ngFor="let i of formProperty.schema.fieldsets" nz-row [nzGutter]="i.gutter">
        <div nz-col [nzOffset]="i.offset" [nzSpan]="i.span" *ngFor="let fieldId of i.fields">
            <nz-sf-item *ngIf="formProperty.visible" [formProperty]="formProperty.getProperty(fieldId)"></nz-sf-item>
        </div>
    </div>
  </ng-template>`
})
export class ObjectWidget extends ObjectLayoutWidget { }
