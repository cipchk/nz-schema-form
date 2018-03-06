import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSchemaFormModule, SFSchema, WidgetData, FormComponent } from '../../../index';
import { By } from '@angular/platform-browser';

describe('widgets: number', () => {
    let fixture: ComponentFixture<TestComponent>;
    let context: TestComponent;
    let dl: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ReactiveFormsModule,
                NzSchemaFormModule.forRoot()
            ],
            declarations: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        dl = fixture.debugElement;
        context = dl.componentInstance;
        el = fixture.debugElement.nativeElement as HTMLElement;
        fixture.detectChanges();
    });

    it('should be create widget', () => {
        expect(fixture).not.toBeUndefined();
        expectValue(undefined, true);
    });

    it('should be get value when set model', () => {
        const age = 10;
        context.model = { age };
        fixture.detectChanges();
        expectValue(age);
    });

    it('should be auto set min value', () => {
        const age = 10;
        const min = 18;
        (context.schema.properties.age.widget as WidgetData).min = min;
        context.model = { age };
        context.comp.refreshSchema();
        fixture.detectChanges();
        expectValue(min);
    });

    it('should be auto set min value when more than max', () => {
        const age = 101;
        (context.schema.properties.age.widget as WidgetData).min = 1;
        (context.schema.properties.age.widget as WidgetData).max = 100;
        context.model = { age };
        context.comp.refreshSchema();
        fixture.detectChanges();
        expectValue(1);
    });

    it('should be return default value', () => {
        const age = 10;
        context.schema.properties.age.default = age;
        context.comp.refreshSchema();
        fixture.detectChanges();
        expectValue(age);
    });

    function expectValue(val: number, inputMuesBeEmpty = false) {
        expect(context._changeValue.age).toBe(val);
        const input = dl.query(By.css('.ant-input-number-input')).nativeElement as HTMLInputElement;
        if (inputMuesBeEmpty)
            expect(input.value).toBe('');
        else
            expect(+input.value).toBe(val);
    }

});

@Component({
    template: `
    <nz-sf #sf [schema]="schema" [(model)]="model" (modelChange)="change($event)"></nz-sf>
    `
})
class TestComponent {
    @ViewChild('sf') comp: FormComponent;
    model: any = { };
    schema = <SFSchema>{
        properties: {
            age: {
                type: 'number',
                widget: <WidgetData>{
                    id: 'number'
                }
            }
        }
    };
    _changeValue: any;
    change(res: any) {
        this._changeValue = res;
    }
}
