import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-rate-widget',
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
    <div nz-form-control nz-col
        [nzSpan]="schema.span_control"
        [nzOffset]="schema.offset_control">


        <nz-rate
        [formControl]="control"
        [nzDisabled]="schema.readOnly"
        [nzCount]="count"
        [nzAllowHalf]="allowHalf"></nz-rate>

        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class RateWidget extends ControlWidget {

    // region: fields
    get count() {
        return this.widgetData.count || 5;
    }

    get allowHalf(){
        return this.widgetData.allowHalf;
    }
    // endregion
}
