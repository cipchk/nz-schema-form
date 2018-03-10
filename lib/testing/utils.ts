import { Injector, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzSchemaFormModule } from '../src/schema-form.module';
import { TestComponent } from './test.component';

export function genModule(): Injector {
    return TestBed.configureTestingModule({
        imports: [
            CommonModule, FormsModule, ReactiveFormsModule,
            NzSchemaFormModule.forRoot()
        ],
        declarations: [TestComponent]
    });
}
