import { ChangeDetectorRef, Component, OnChanges, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Action, ActionRegistry, FormPropertyFactory, FormProperty, SchemaPreprocessor, ValidatorRegistry, Validator } from './model';
import { SFSchema } from './schema';
import { WidgetFactory } from './widget.factory';
import { SchemaValidatorFactory } from './schema.validator.factory';
import { TerminatorService } from './terminator.service';
import { SchemaFormOptions, NZ_SF_OPTIONS_TOKEN } from '../schema-form.options';

export function useFactory(schemaValidatorFactory: any, validatorRegistry: any, options: SchemaFormOptions) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, options);
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
            deps: [SchemaValidatorFactory, ValidatorRegistry, NZ_SF_OPTIONS_TOKEN]
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

    rootProperty: FormProperty = null;

    constructor(private formPropertyFactory: FormPropertyFactory, private actionRegistry: ActionRegistry, private validatorRegistry: ValidatorRegistry, private cdr: ChangeDetectorRef, private terminator: TerminatorService) {}

    private coverProperty(schema: SFSchema) {
        const isHorizontal = this.layout === 'horizontal';

        Object.keys(schema.properties).forEach(key => {
            const p = schema.properties[key];
            if (isHorizontal) {
                if (schema.span_label_fixed) {
                    if (!p.span_label_fixed) p.span_label_fixed = schema.span_label_fixed;
                } else {
                    if (!p.span_label) p.span_label = typeof schema.span_label === 'undefined' ? 5 : schema.span_label;
                    if (!p.span_control) p.span_control = typeof schema.span_control === 'undefined' ? 19 : schema.span_control;
                    if (!p.offset_control) p.offset_control = typeof schema.offset_control === 'undefined' ? null : schema.offset_control;
                }
            } else {
                p.span_label = null;
                p.span_control = null;
                p.offset_control = null;
            }

            if (p.items && p.type === 'array') {
                this.coverProperty(p.items);
            }
        });
    }

    private coverButtonProperty(schema: SFSchema) {
        if (!schema.button) return;
        if (this.layout === 'horizontal' && !schema.button.grid) {
            const keys = Object.keys(schema.properties);
            if (keys.length > 0) {
                schema.button.grid = {
                    offset: schema.properties[keys[0]].span_label
                };
            }
        }
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

            this.coverProperty(this.schema);
            this.coverButtonProperty(this.schema);
            if (this.schema.debug) {
                console.warn('schema', this.schema);
            }

            if (!changes.schema.firstChange) {
                this.terminator.destroy();
            }
            SchemaPreprocessor.preprocess(this.schema);
            this.rootProperty = this.formPropertyFactory.createProperty(this.schema);

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

    _addTpl(path: string, templateRef: TemplateRef<any>) {
        const property = this.rootProperty.searchProperty(path);
        if (!property) {
            console.warn(`未找到路径 ${path}`);
            return ;
        }
        property.schema.__render = templateRef;
    }

    reset() {
        this.rootProperty._reset(null, true);
    }
}
