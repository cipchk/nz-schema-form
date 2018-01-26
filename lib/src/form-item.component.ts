import { Component, OnChanges, SimpleChanges, Input, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef, ComponentRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Widget } from 'angular2-schema-form';
import { FormProperty, ActionRegistry } from 'angular2-schema-form/dist/model';
import { WidgetFactory } from 'angular2-schema-form/dist/widgetfactory';
import { TerminatorService } from 'angular2-schema-form/dist/terminator.service';
import { SFSchema, SFButton, SFButtonItem } from './interface';

@Component({
    selector: 'nz-sf-item',
    template: `
    <ng-template #target></ng-template>
    <div *ngIf="btn" nz-form-item nz-row [ngClass]="btn.class" [ngStyle]="btn.style">
        <div nz-col
            [nzSpan]="_grid.span" [nzOffset]="_grid.offset"
            [nzXs]="_grid.xs" [nzSm]="_grid.sm" [nzMd]="_grid.md"
            [nzLg]="_grid.lg" [nzXl]="_grid.xl">
            <sf-form-element-action *ngFor="let i of btn.items"
                [button]="i" [formProperty]="formProperty"></sf-form-element-action>
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
    btn: SFButton;
    _grid: any = {};
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
        const btn = (this.formProperty.schema as SFSchema).button;
        if (btn !== undefined) {
            this.btn = btn;
            this._grid = btn.grid || {};
            for (let button of btn.items) {
                this.createButtonCallback(button);
            }
        }
    }

    private createButtonCallback(button: SFButtonItem) {
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
