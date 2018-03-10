import { Component, OnChanges, SimpleChanges, Input, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef, ComponentRef, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SFSchema } from './schema';
import { SFButton, SFButtonItem } from './schema/button';
import { FormProperty } from './model/formproperty';
import { Widget } from './widget';
import { ActionRegistry } from './model/actionregistry';
import { WidgetFactory } from './widget.factory';
import { TerminatorService } from './terminator.service';
import { SchemaFormOptions, NZ_SF_OPTIONS_TOKEN } from './schema-form.options';

@Component({
    selector: 'nz-sf-item',
    template: `
    <ng-template #target></ng-template>
    <div *ngIf="btn" nz-form-item nz-row [ngClass]="btn.class" [ngStyle]="btn.style">
        <div nz-col
            [nzSpan]="_grid.span" [nzOffset]="_grid.offset"
            [nzXs]="_grid.xs" [nzSm]="_grid.sm" [nzMd]="_grid.md"
            [nzLg]="_grid.lg" [nzXl]="_grid.xl">
            <nz-sf-action *ngFor="let i of btn.items"
                [button]="i" [formProperty]="formProperty"></nz-sf-action>
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
        private cdr: ChangeDetectorRef,
        @Inject(NZ_SF_OPTIONS_TOKEN) private options: SchemaFormOptions
    ) {}

    ngOnInit() {
        this.parseButtons();
        this.terminator.onDestroy.subscribe((destroy: any) => {
            if (destroy) {
                this.ref.destroy();
            }
        });
    }

    private parseButtons() {
        const btn = (this.formProperty.schema as SFSchema).button;
        if (btn !== undefined) {
            this.btn = btn;
            this._grid = btn.grid || {};
            for (const button of btn.items) {
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
            if (e) e.preventDefault();
        };
    }

    onWidgetInstanciated(widget: Widget<any>) {
        this.widget = widget;
        const id = '_sf-' + FormItemComponent.counter++;

        const schema = this.formProperty.schema;
        this.widget.formProperty = this.formProperty;
        this.widget.schema = schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
        this.formProperty._widget = widget;
        if (this.formProperty.parent) {
            const key = this.formProperty.path.substr(this.formProperty.path.lastIndexOf('/') + 1);
            this.widget.required = ((this.formProperty.parent.schema.required || []) as string[]).indexOf(key) !== -1;
        }
        this.widget.onlyVisual = typeof schema.onlyVisual === 'undefined' ? this.options.onlyVisual : schema.onlyVisual;
        this.widget.showDescription = typeof schema.showDescription === 'undefined' ? this.options.showDescription : schema.showDescription;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.ref = this.widgetFactory.createWidget(this.container, this.formProperty.schema.widget.id);
        this.onWidgetInstanciated(this.ref.instance);
        this.cdr.detectChanges();
    }

}
