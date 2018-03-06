import { Directive, Input, TemplateRef, OnInit } from '@angular/core';
import { FormComponent } from '../../form.component';

@Directive({
    selector: '[nz-template]'
})
export class CustomTemplateDirective implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('nz-template') path: string;

    constructor(private templateRef: TemplateRef<any>, private table: FormComponent) {}

    ngOnInit(): void {
        this.table._addTpl(this.path.startsWith('/') ? this.path : `/` + this.path, this.templateRef);
    }
}
