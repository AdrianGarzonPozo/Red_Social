/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubirComponent } from './subir.component';

describe('SubirComponent', () => {
  let component: SubirComponent;
  let fixture: ComponentFixture<SubirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
