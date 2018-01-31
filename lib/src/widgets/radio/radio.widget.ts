import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-radio-widget',
    template: `
    <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-radio-group [formControl]="control" >
            <label *ngFor="let option of selectList" 
                nz-radio 
                [nzValue]="option.value"
                [nzDisabled]="schema.disabled">
                <span [innerHTML]="option.label"></span>
            </label>
        </nz-radio-group>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class RadioWidget extends ControlWidget {
    get selectList() {
        return this.widgetData.selectList || [];
    }
}
