import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd';
import { NzSchemaFormModule } from '../../../index';

describe('widgets: custom', () => {
    let fixture: ComponentFixture<TestComponent>;
    let context: TestComponent;
    let dl: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ReactiveFormsModule,
                NzInputModule,
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
        expect(el.querySelectorAll('nz-sf-custom-widget').length).toBe(1);
    });
});

@Component({
    template: `
    <nz-sf [schema]="schema">
        <ng-template nz-template="custom" let-control let-schema>
            <nz-input [formControl]="control">
                <ng-template #addOnBefore>http://</ng-template>
                <ng-template #addOnAfter>.com</ng-template>
            </nz-input>
        </ng-template>
    </nz-sf>
    `
})
class TestComponent {
    schema = {
        properties: {
            custom: {
                type: 'string',
                title: '自定义内容',
                widget: 'custom'
            }
        }
    }
}
