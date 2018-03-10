import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class PageObject {
    fixture: ComponentFixture<TestComponent>;
    context: TestComponent;
    dl: DebugElement;
    el: HTMLElement;

    constructor() {
        this.fixture = TestBed.createComponent(TestComponent);
        this.dl = this.fixture.debugElement;
        this.context = this.dl.componentInstance;
        this.el = this.fixture.debugElement.nativeElement as HTMLElement;
        this.fixture.detectChanges();
    }

    updateWidget(obj: { [key: string]: any }) {
        // tslint:disable-next-line:forin
        for (const key in obj) {
            this.context.schema.properties.email.widget[key] = obj[key];
        }
        this.context.comp.refreshSchema();
        this.fixture.detectChanges();
        return this;
    }

    updateSchema(obj: { [key: string]: any }) {
        // tslint:disable-next-line:forin
        for (const key in obj) {
            this.context.schema.properties.email[key] = obj[key];
        }
        this.context.comp.refreshSchema();
        this.fixture.detectChanges();
        return this;
    }

    expectAttribute(cls: string, attrName: string, expectValue: any) {
        const target = this.dl.query(By.css(cls));
        expect(target).not.toBeNull();
        expect((target.nativeElement as HTMLElement).attributes.getNamedItem(attrName).value).toBe(expectValue);
        return this;
    }

    expectClassName(cls: string, expectClassName: string) {
        const target = this.dl.query(By.css(cls));
        expect(target).not.toBeNull();
        expect((target.nativeElement as HTMLElement).classList).toContain(expectClassName);
        return this;
    }

    expectDisabled(cls: string, result = true) {
        const target = this.dl.query(By.css(cls));
        if (result) {
            expect(target).not.toBeNull();
        } else {
            expect(target).toBeNull();
        }
        expect((target.nativeElement as any).disabled).toBe(result);
        return this;
    }

}
