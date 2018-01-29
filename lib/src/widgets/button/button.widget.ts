import { Component, OnInit } from '@angular/core';
import { FormProperty } from '../../model';
import { SFButtonItem } from '../../schema/button';

@Component({
    selector: 'nz-sf-button-widget',
    template: `
    <button nz-button [nzType]="type"
        [disabled]="button.submit && !formProperty.valid"
        [nzSize]="size"
        (click)="button.action($event)">{{button.label}}</button>
    `
})
export class ButtonWidget implements OnInit {

    button: SFButtonItem;
    formProperty: FormProperty;
    type: string = null;

    ngOnInit(): void {
        this.type = this.button.type ? this.button.type : this.button.submit ? 'primary' : null;
    }

    get size() {
        return this.button.size || 'large';
    }

}
