import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[fixed-label]'
})
export class FixedLabelDirective implements OnInit {

    @Input('fixed-label') num: number;
    private el: HTMLDivElement;

    constructor(er: ElementRef, private render: Renderer2) {
        this.el = er.nativeElement as HTMLDivElement;
    }

    ngOnInit(): void {
        if (this.el.children.length === 0 || this.num == null || this.num <= 0) return;
        const widgetEl = this.el.children[0];
        this.render.addClass(widgetEl, 'nz-sf-fixed');
        const labelEl = widgetEl.querySelector('[nz-form-label]');
        const unit = this.num + 'px';
        if (labelEl) {
            this.render.setStyle(labelEl, 'width', unit);
        } else {
            const controlEl = widgetEl.querySelector('.ant-form-item-control');
            if (controlEl) this.render.setStyle(controlEl, 'margin-left', unit);
        }
    }
}
