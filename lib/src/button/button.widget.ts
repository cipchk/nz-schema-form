import { Component, OnInit } from '@angular/core';
import { FormProperty } from 'angular2-schema-form/dist/model';
import { SFButtonSchema } from '../interface';

@Component({
    selector: 'nz-sf-button-widget',
    template: `
    <button nz-button [nzType]="type" [ngClass]="button.className"
        [disabled]="button.submit && !formProperty.valid"
        [nzSize]="size"
        (click)="button.action($event)">{{button.label}}</button>
    `
})
export class ButtonWidget implements OnInit {

    button: SFButtonSchema;
    formProperty: FormProperty;
    type: string = null;

    ngOnInit(): void {
        this.type = this.button.type ? this.button.type : this.button.submit ? 'primary' : null;
    }

    get size() {
        return this.button.size || 'large';
    }

}
