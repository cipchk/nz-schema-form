import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { FormProperty } from '../../model';
import { SFButtonItem } from '../../schema/button';
import { FormComponent } from '../../form.component';

@Component({
    selector: 'nz-sf-button-widget',
    template: `
    <button nz-button [nzType]="type"
        [disabled]="disabled"
        [nzSize]="size"
        (click)="button.action($event)">{{button.label}}</button>
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
            this.disabled$ = this.formComp.onErrorChange.pipe(debounceTime(300)).subscribe(() => {
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
