import { Component, OnChanges, SimpleChanges, Input, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef, ComponentRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Widget } from 'angular2-schema-form';
import { FormProperty, ActionRegistry } from 'angular2-schema-form/dist/model';
import { WidgetFactory } from 'angular2-schema-form/dist/widgetfactory';
import { TerminatorService } from 'angular2-schema-form/dist/terminator.service';

@Component({
    selector: 'nz-sf-item',
    template: `
    <ng-template #target></ng-template>
    <div *ngIf="buttons.length" nz-form-item nz-row>
        <div nz-col [nzOffset]="buttons[0].offset" [nzSpan]="buttons[0].span">
            <sf-form-element-action *ngFor="let button of buttons" [button]="button" [formProperty]="formProperty"></sf-form-element-action>
        </div>
    </div>
    `
})
export class FormItemComponent implements OnInit, OnChanges {
    private static counter = 0;

    @Input() formProperty: FormProperty;
    @ViewChild('target', {read: ViewContainerRef}) container: ViewContainerRef;

    control: FormControl = new FormControl('', () => null);
    widget: Widget<any> = null;
    buttons: any[] = [];
    private ref: ComponentRef<any>;

    constructor(
        private actionRegistry: ActionRegistry,
        private widgetFactory: WidgetFactory = null,
        private terminator: TerminatorService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.parseButtons();
        this.terminator.onDestroy.subscribe(destroy => {
            if (destroy) {
                this.ref.destroy();
            }
        })
    }

    private parseButtons() {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;

            for (let button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }

    private createButtonCallback(button: any) {
        button.action = (e: any) => {
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }

    onWidgetInstanciated(widget: Widget<any>) {
        this.widget = widget;
        let id = '_sf-' + FormItemComponent.counter++;

        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.ref = this.widgetFactory.createWidget(this.container, this.formProperty.schema.widget.id);
        this.onWidgetInstanciated(this.ref.instance);
        this.cdr.detectChanges();
    }

}
