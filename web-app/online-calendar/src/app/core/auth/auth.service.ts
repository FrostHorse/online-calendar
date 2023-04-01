import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Nullable } from 'src/app/models/nullable/nullable';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject$ = new BehaviorSubject<Nullable<User>>(
    undefined
  );
  public readonly user$ = this.userSubject$.asObservable();
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public fetchAllUser(): Observable<any> {
    const url = 'http://localhost:3000/users';
    return this.http.get<any>(url).pipe(tap(console.log));
  }

  public signUp(user: User): Observable<User> {
    const url = 'http://localhost:3000/users';
    return this.http.post<any>(url, user).pipe(
      tap(() => {
        this.router.navigate(['sign-in']);
      })
    );
  }

  public signIn(email: string, password: string): Observable<User> {
    const url = 'http://localhost:3000/users/login';
    return this.http.post<any>(url, { email, password }).pipe(
      tap((user) => {
        if (user) {
          const localUser = { ...user, password };
          this.userSubject$.next(localUser);
          localStorage.setItem('user', JSON.stringify(localUser));
          this.router.navigate(['calendar']);
        }
      })
    );
  }

  public autoLogIn(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null');
    if (user) {
      return this.signIn(user.email, user.password);
    }
    return from(this.router.navigate(['sign-in']));
  }
}
