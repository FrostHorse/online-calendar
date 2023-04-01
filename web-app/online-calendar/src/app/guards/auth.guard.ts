import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { isStrictDefined } from '../utils/condition-checks';

const canActivate: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    switchMap((user) => {
      if (isStrictDefined(user)) {
        return of(true);
      }
      return authService.autoLogIn().pipe(map(() => false));
    })
  );
};

export const authGuard = { canActivate };
