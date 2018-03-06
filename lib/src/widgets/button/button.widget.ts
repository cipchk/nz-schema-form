import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { FormProperty } from '../../model';
import { SFButtonItem } from '../../schema/button';
import { FormComponent } from '../../form.component';

@Component({
    selector: 'nz-sf-button-widget',
    template: `
    <ng-container *ngIf="button.popconfirm; else btn">
        <nz-popconfirm [nzTitle]="button.poptitle" (nzOnConfirm)="button.action($event)">
            <button nz-button [nzType]="type" nz-popconfirm
                [disabled]="disabled"
                [nzSize]="size">{{button.label}}</button>
        </nz-popconfirm>
    </ng-container>
    <ng-template #btn>
        <button nz-button [nzType]="type"
            [disabled]="disabled"
            [nzSize]="size"
            (click)="button.action($event)">{{button.label}}</button>
    </ng-template>
    `
})
export class ButtonWidget implements OnInit, OnDestroy {

    button: SFButtonItem;
    formProperty: any;
    type: string = null;
    disabled = false;
    disabled$: Subscription;
    size: string;

    constructor(private formComp: FormComponent) {}

    ngOnInit(): void {
        this.size = this.button.size || 'large';
        this.disabled = this.button.submit;
        this.type = this.button.type ? this.button.type : this.button.submit ? 'primary' : null;
        if (this.button.submit === true && this.formProperty.forEachChildRecursive) {
            this.disabled$ = this.formComp.errorChange.pipe(debounceTime(300)).subscribe(() => {
                let disabled = false;
                this.formProperty.forEachChildRecursive((p: FormProperty) => {
                    if (!disabled && !p.valid) disabled = true;
                });
                this.disabled = disabled;
            });
        }
    }

    ngOnDestroy(): void {
        if (this.disabled$) this.disabled$.unsubscribe();
    }

}
