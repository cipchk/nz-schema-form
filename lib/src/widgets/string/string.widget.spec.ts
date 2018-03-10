import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TestComponent } from '../../../testing/test.component';
import { genModule } from '../../../testing/utils';
import { PageObject } from '../../../testing/page-object';

describe('widgets: string', () => {
    let page: PageObject;

    beforeEach(() => {
        genModule();
        page = new PageObject();
    });

    it('should hava placeholder', () => {
        page.updateWidget({ placeholder: 'test' })
            .expectAttribute('input', 'placeholder', 'test');
    });

    it('should hava maxLength', () => {
        page.updateSchema({ maxLength: 10 })
            .expectAttribute('input', 'maxlength', '10');
    });

    it('should hava minLength', () => {
        page.updateSchema({ minLength: 10 })
            .expectAttribute('input', 'minlength', '10');
    });

    it('should be disabled when widget the widget attribute contains', () => {
        page.updateWidget({ disabled: true })
            .expectDisabled('input');
    });

    it('should be disabled when schema attribute contains readOnly', () => {
        page.updateSchema({ readOnly: true })
            .expectDisabled('input');
    });

    it('should hava autocomplete attribute is on', () => {
        page.updateWidget({ autocomplete: 'on' })
            .expectAttribute('input', 'autocomplete', 'on');
    });

    it('should be set small size', () => {
        page.updateSchema({ size: 'small' })
            .expectClassName('input', 'ant-input-sm');
    });

    it('should be password input', () => {
        page.updateWidget({ type: 'password' })
            .expectAttribute('input', 'type', 'password');
    });
});
