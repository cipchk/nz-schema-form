import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSchemaFormModule } from '../../../index';

describe('widgets: string', () => {
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
    });
});

@Component({
    template: `
    <nz-sf [schema]="schema" [model]="model"></nz-sf>
    `
})
class TestComponent {
    model = { email: 'cipchk@qq.com' };
    schema = {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                description: '请输入邮箱，最多20个字符',
                showDescription: true,
                maxLength: 20
            }
        }
    }
}
