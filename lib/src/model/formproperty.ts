import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { SchemaValidatorFactory } from '../schema.validator.factory';
import { ValidatorRegistry } from './validatorregistry';
import { SchemaFormOptions, NZ_SF_OPTIONS_TOKEN } from '../../schema-form.options';
import { ErrorData } from './../schema/errors';

export abstract class FormProperty {
    schemaValidator: Function;

    _value: any = null;
    _errors: any = null;
    private _valueChanges = new BehaviorSubject<any>(null);
    private _errorsChanges = new BehaviorSubject<any>(null);
    private _visible = true;
    private _visibilityChanges = new BehaviorSubject<boolean>(true);
    private _root: PropertyGroup;
    private _parent: PropertyGroup;
    private _path: string;
    _widget: any;

    constructor(
        schemaValidatorFactory: SchemaValidatorFactory,
        private validatorRegistry: ValidatorRegistry,
        public schema: any,
        parent: PropertyGroup,
        path: string,
        private options: SchemaFormOptions
    ) {
        this.schemaValidator = schemaValidatorFactory.createValidatorFn(this.schema);

        this._parent = parent;
        if (parent) {
            this._root = parent.root;
        } else if (this instanceof PropertyGroup) {
            this._root = <PropertyGroup>(<any>this);
        }
        this._path = path;
    }

    get valueChanges() {
        return this._valueChanges;
    }

    get errorsChanges() {
        return this._errorsChanges;
    }

    get type(): string {
        return this.schema.type;
    }

    get parent(): PropertyGroup {
        return this._parent;
    }

    get root(): PropertyGroup {
        return this._root || <PropertyGroup>(<any>this);
    }

    get path(): string {
        return this._path;
    }

    get value() {
        return this._value;
    }

    get visible() {
        return this._visible;
    }

    get valid() {
        return this._errors === null;
    }

    abstract setValue(value: any, onlySelf: boolean): any;

    abstract _reset(value: any, onlySelf: boolean): any;

    /** 重置表单 */
    reset(value: any, onlySelf: boolean = true): any {
        return null;
    }

    updateValueAndValidity(onlySelf = false, emitEvent = true) {
        this._updateValue();

        if (emitEvent) {
            this.valueChanges.next(this.value);
        }

        this._runValidation();

        if (this.parent && !onlySelf) {
            this.parent.updateValueAndValidity(onlySelf, emitEvent);
        }
    }

    /**
     * @internal
     */
    abstract _hasValue(): boolean;

    /**
     *  @internal
     */
    abstract _updateValue(): any;

    /**
     * @internal
     */
    _runValidation(): any {
        let errors = this.schemaValidator(this._value) || [];
        let customValidator = this.validatorRegistry.get(this.path);
        if (customValidator) {
            let customErrors = customValidator(this.value, this, this.findRoot());
            // fix error format
            if (customErrors) {
                customErrors = Array.isArray(customErrors) ? customErrors : [ customErrors ];
                customErrors.forEach((err, idx: number) => {
                    if (!err.message) throw new Error(`自定义校验器必须至少返回一个 'message' 属性，用于表示错误文本`);
                    err.path = this._path;
                    if (!err.code) err.code = `CUSTOM-ERROR-${idx}`;
                    if (!err.params) err.params = [ this._path, this._value ];
                });
            }
            errors = this.mergeErrors(errors, customErrors);
        }
        if (errors.length === 0) {
            errors = null;
        }

        this._errors = errors;
        this.setErrors(this._errors);
    }

    private mergeErrors(errors: any, newErrors: any) {
        if (newErrors) {
            if (Array.isArray(newErrors)) {
                errors = errors.concat(...newErrors);
            } else {
                errors.push(newErrors);
            }
        }
        return errors;
    }

    private setErrors(errors: any) {
        if (errors && !this.options.onlyVisual) {
            errors = errors.map((err: any) => {
                let message = (this.schema.errors || {})[err.code] || this.options.errors[err.code] || ``;
                const args: ErrorData = {
                    title: this.schema.title,
                    code: err.code,
                    path: err.path,
                    description: err.description,
                    message: err.message
                };
                err.params.forEach((v: any, i: number) => args[`param.${i}`] = v);
                if (message && typeof message === 'function') message = message(args) as string;
                if (message) {
                    if (~message.indexOf('{')) {
                        message = message.replace(/{([\.a-z0-9]+)}/, (v: string, key: string) => args[key] || '');
                    }
                    err.message = message;
                }
                return err;
            });
        }
        this._errors = errors;
        this._errorsChanges.next(errors);
    }

    extendErrors(errors: any) {
        errors = this.mergeErrors(this._errors || [], errors);
        this.setErrors(errors);
    }

    searchProperty(path: string): FormProperty {
        let prop: FormProperty = this;
        let base: PropertyGroup = null;

        let result = null;
        if (path[0] === '/') {
            base = this.findRoot();
            result = base.getProperty(path.substr(1));
        } else {
            while (result === null && prop.parent !== null) {
                prop = base = prop.parent;
                result = base.getProperty(path);
            }
        }
        return result;
    }

    findRoot(): PropertyGroup {
        let property: FormProperty = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return <PropertyGroup>property;
    }

    private setVisible(visible: boolean) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        this.updateValueAndValidity();
        if (this.parent) {
            this.parent.updateValueAndValidity(false, true);
        }
    }

    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    _bindVisibility() {
        let visibleIf = this.schema.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        } else if (visibleIf !== undefined) {
            let propertiesBinding = [];
            for (let dependencyPath in visibleIf) {
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    let property = this.searchProperty(dependencyPath);
                    if (property) {
                        let valueCheck = property.valueChanges.pipe(
                            map((value: any) => {
                                if (visibleIf[dependencyPath].indexOf('$ANY$') !== -1) {
                                    return value.length > 0;
                                } else {
                                    return visibleIf[dependencyPath].indexOf(value) !== -1;
                                }
                            })
                        );
                        let visibilityCheck = property._visibilityChanges;
                        let and = combineLatest([valueCheck, visibilityCheck], (v1: any, v2: any) => v1 && v2);
                        propertiesBinding.push(and);
                    } else {
                        console.warn("Can't find property " + dependencyPath + ' for visibility check of ' + this.path);
                    }
                }
            }

            combineLatest(propertiesBinding, (...values: boolean[]) => {
                return values.indexOf(true) !== -1;
            }).pipe(distinctUntilChanged())
                .subscribe((visible: any) => {
                    this.setVisible(visible);
                });
        }
    }
}

export abstract class PropertyGroup extends FormProperty {
    properties: any = null;

    reset(value: any, onlySelf: boolean = true): any {
        const ret = this._reset(value, onlySelf);
        this.forEachChild((property: any, propertyId: string) => {
          if (property.visible && property._widget && property._widget.control) {
            property._widget.control.markAsPristine();
            property._widget.errorMessages = null;
          }
        });
        return ret;
    }

    getProperty(path: string) {
        let subPathIdx = path.indexOf('/');
        let propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;

        let property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            let subPath = path.substr(subPathIdx + 1);
            property = (<PropertyGroup>property).getProperty(subPath);
        }
        return property;
    }

    forEachChild(fn: (formProperty: FormProperty, str: String) => void) {
        for (let propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                let property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    }

    forEachChildRecursive(fn: (formProperty: FormProperty) => void) {
        this.forEachChild(child => {
            fn(child);
            if (child instanceof PropertyGroup) {
                (<PropertyGroup>child).forEachChildRecursive(fn);
            }
        });
    }

    _bindVisibility() {
        super._bindVisibility();
        this._bindVisibilityRecursive();
    }

    private _bindVisibilityRecursive() {
        this.forEachChildRecursive(property => {
            property._bindVisibility();
        });
    }

    isRoot() {
        return this === this.root;
    }
}
