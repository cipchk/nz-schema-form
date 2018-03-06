import { Component, ComponentRef, Input, OnChanges, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { WidgetFactory } from './widget.factory';
import { TerminatorService } from './terminator.service';

@Component({
    selector: 'nz-sf-action',
    template: '<ng-template #target></ng-template>'
})
export class FormActionComponent implements OnChanges, OnInit {
    @Input() button: any;

    @Input() formProperty: any;

    @ViewChild('target', { read: ViewContainerRef })
    container: ViewContainerRef;

    private ref: ComponentRef<any>;

    constructor(private widgetFactory: WidgetFactory = null, private terminator: TerminatorService) {}

    ngOnInit() {
        this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }

    ngOnChanges() {
        this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
        this.ref.instance.button = this.button;
        this.ref.instance.formProperty = this.formProperty;
    }
}
