/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Login_registroComponent } from './login_registro.component';

describe('Login_registroComponent', () => {
  let component: Login_registroComponent;
  let fixture: ComponentFixture<Login_registroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login_registroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login_registroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
