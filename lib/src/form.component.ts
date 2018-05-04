import { ChangeDetectorRef, Component, OnChanges, EventEmitter, Input, Output, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Action, ActionRegistry, FormPropertyFactory, FormProperty, SchemaPreprocessor, ValidatorRegistry, Validator } from './model';
import { SFSchema } from './schema';
import { WidgetFactory } from './widget.factory';
import { SchemaValidatorFactory } from './schema.validator.factory';
import { TerminatorService } from './terminator.service';
import { SchemaFormOptions, NZ_SF_OPTIONS_TOKEN } from './schema-form.options';

export function useFactory(schemaValidatorFactory: any, validatorRegistry: any, options: SchemaFormOptions) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, options);
}

@Component({
    selector: 'nz-sf, [nz-sf]',
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

    @Output() modelChange = new EventEmitter<any>();

    @Input() actions: { [actionId: string]: Action } = {};

    @Input() validators: { [path: string]: Validator } = {};

    @Output() change = new EventEmitter<{ value: any }>();

    @Output() isValid = new EventEmitter<boolean>();

    @Output() errorChange = new EventEmitter<{ value: any[] }>();

    _valid = true;

    get valid(): boolean {
        return this._valid;
    }

    rootProperty: FormProperty = null;

    constructor(
        private formPropertyFactory: FormPropertyFactory,
        private actionRegistry: ActionRegistry,
        private validatorRegistry: ValidatorRegistry,
        private terminator: TerminatorService
    ) {}

    private coverProperty(schema: SFSchema) {
        const isHorizontal = this.layout === 'horizontal';

         if (schema.properties) {
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

                if (p.properties && Object.keys(p.properties).length)
                    this.coverProperty(p);
            });
        }
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

        this._refreshSchema(changes);
    }

    private _refreshSchema(changes?: any) {
        if (!changes) {
            changes = {
                schema: {
                    firstChange: false
                }
            };
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
                if (this.modelChange.observers.length > 0) {
                    // two way binding is used
                    if (this.model) {
                        this.model = Object.assign(this.model, value);
                    } else {
                        this.model = value;
                    }
                    this.modelChange.emit(this.model);
                }
                this.change.emit({ value: value });
            });
            this.rootProperty.errorsChanges.subscribe(value => {
                this.errorChange.emit({ value: value });
                this._valid = !(value && value.length);
                this.isValid.emit(this._valid);
            });
        }

        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
        }
    }

    private setValidators() {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (const validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    }

    private setActions() {
        this.actionRegistry.clear();
        if (this.actions) {
            for (const actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    }

    /** @private */
    _addTpl(path: string, templateRef: TemplateRef<any>) {
        const property = this.rootProperty.searchProperty(path);
        if (!property) {
            console.warn(`未找到路径 ${path}`);
            return ;
        }
        property.schema.__render = templateRef;
    }

    /**
     * 刷新 Schema，一般需要动态修改 Schema 某个值时可以方便调用
     */
    refreshSchema() {
        this._refreshSchema({
            schema: {
                firstChange: false
            }
        });
    }

    /** 重置表单 */
    reset() {
        this.rootProperty._reset(null, true);
    }
}
