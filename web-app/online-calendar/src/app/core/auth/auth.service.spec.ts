/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('Service: SignUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
