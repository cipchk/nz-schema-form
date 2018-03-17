import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSchemaFormModule, SFSchema, WidgetData, FormComponent } from '../../../index';
import { By } from '@angular/platform-browser';

describe('widgets: date-range', () => {
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
    <nz-sf #sf [schema]="schema" [(model)]="model" (modelChange)="change($event)"></nz-sf>
    `
})
class TestComponent {
    @ViewChild('sf') comp: FormComponent;
    model: any = {};
    schema = <SFSchema>{
        properties: {
            dateRange: {
                type: 'string',
                title: 'date range 1',
                widget: 'date-range'
            },
            dateStringRange: {
                type: 'string',
                title: 'date range 2',
                default: '2018-01-02~2018-02-03',
                widget: {
                    id: 'date-range'
                }
            },
            dateArrayRange: {
                type: 'array',
                items: {
                    type: 'string'
                },
                title: 'date range 3',
                default: [
                    '2018-01-02',
                    '2018-02-03'
                ],
                widget: {
                    id: 'date-range',
                    format: 'YYYY-MM-DD HH:mm:ss'
                }
            },
            dateStampRange: {
                type: 'array',
                items: {
                    type: 'number'
                },
                title: 'date range 4',
                default: [
                    1521267358907,
                    1521388800000
                ],
                widget: {
                    id: 'date-range'
                }
            },
            dateStampRange2: {
                type: 'array',
                items: {
                    type: 'number'
                },
                title: 'date range 4',
                default: 'invalid value',
                widget: {
                    id: 'date-range'
                }
            },
            dateStringRange2: {
                type: 'string',
                title: 'date range 5',
                default: '2018-01-02|2018-02-03',
                widget: {
                    id: 'date-range'
                }
            }
        }
    };
    _changeValue: any;
    change(res: any) {
        this._changeValue = res;
    }
}
