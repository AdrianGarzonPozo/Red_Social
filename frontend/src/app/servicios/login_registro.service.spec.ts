/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Login_registroService } from './login_registro.service';

describe('Service: Login_registro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Login_registroService]
    });
  });

  it('should ...', inject([Login_registroService], (service: Login_registroService) => {
    expect(service).toBeTruthy();
  }));
});
