import { ChangeDetectorRef, Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';

import { SchemaValidatorFactory } from 'angular2-schema-form';
import { WidgetFactory } from 'angular2-schema-form/dist/widgetfactory';
import { TerminatorService } from 'angular2-schema-form/dist/terminator.service';
import { Action, ActionRegistry, FormPropertyFactory, FormProperty, SchemaPreprocessor, ValidatorRegistry, Validator } from 'angular2-schema-form/dist/model';
import { SFSchema } from './interface';

export function useFactory(schemaValidatorFactory: any, validatorRegistry: any) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry);
}

@Component({
    selector: 'nz-sf',
    template: `
    <form nz-form [nzLayout]="layout" *ngIf="rootProperty && rootProperty.visible">
        <nz-sf-item [formProperty]="rootProperty"></nz-sf-item>
    </form>`,
    styleUrls: [ './patch.less' ],
    providers: [
        ActionRegistry,
        ValidatorRegistry,
        SchemaPreprocessor,
        WidgetFactory,
        {
            provide: FormPropertyFactory,
            useFactory: useFactory,
            deps: [SchemaValidatorFactory, ValidatorRegistry]
        },
        TerminatorService
    ]
})
export class FormComponent implements OnChanges {

    @Input() layout: 'horizontal' | 'vertical' | 'inline' = 'horizontal';

    @Input() schema: any = null;

    @Input() model: any;

    @Input() actions: { [actionId: string]: Action } = {};

    @Input() validators: { [path: string]: Validator } = {};

    @Output() onChange = new EventEmitter<{ value: any }>();

    @Output() modelChanged = new EventEmitter<any>();

    @Output() isValid = new EventEmitter<boolean>();

    @Output() onErrorChange = new EventEmitter<{ value: any[] }>();

    @Output() onErrorsChange = new EventEmitter<{ value: any }>();

    rootProperty: FormProperty = null;

    constructor(private formPropertyFactory: FormPropertyFactory, private actionRegistry: ActionRegistry, private validatorRegistry: ValidatorRegistry, private cdr: ChangeDetectorRef, private terminator: TerminatorService) {}

    private updateFS(schema: SFSchema) {
        schema.layout = this.layout;

        if (!schema.span && !schema.span_label) return;
        Object.keys(schema.properties).forEach(key => {
            if (schema.offset) schema.properties[key].offset = schema.offset;
            if (schema.span) schema.properties[key].span = schema.span;
            if (schema.span_label) schema.properties[key].span_label = schema.span_label;
        });
    }

    ngOnChanges(changes: any) {
        if (changes.validators) {
            this.setValidators();
        }

        if (changes.actions) {
            this.setActions();
        }

        if (this.schema && !this.schema.type) {
            this.schema.type = 'object';
        }

        if (this.schema && changes.schema) {
            if (!changes.schema.firstChange) {
                this.terminator.destroy();
            }
            SchemaPreprocessor.preprocess(this.schema);
            this.rootProperty = this.formPropertyFactory.createProperty(this.schema);
            this.updateFS(this.rootProperty.schema);

            this.rootProperty.valueChanges.subscribe(value => {
                if (this.modelChanged.observers.length > 0) {
                    // two way binding is used
                    if (this.model) {
                        Object.assign(this.model, value);
                    } else {
                        this.model = value;
                    }
                    this.modelChanged.emit(value);
                }
                this.onChange.emit({ value: value });
            });
            this.rootProperty.errorsChanges.subscribe(value => {
                this.onErrorChange.emit({ value: value });
                this.isValid.emit(!(value && value.length));
            });
        }

        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
            this.cdr.detectChanges();
        }
    }

    private setValidators() {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (let validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    }

    private setActions() {
        this.actionRegistry.clear();
        if (this.actions) {
            for (let actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    }

    public reset() {
        this.rootProperty.reset(null, true);
    }
}
