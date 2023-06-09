import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import { baseUrl } from 'src/app/constants/baseUrl';
import { User } from 'src/app/core/models/user';
import { Nullable } from 'src/app/models/nullable/nullable';
import { resetAppAction } from 'src/app/store/actions/reset-app.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject$ = new BehaviorSubject<Nullable<User>>(
    undefined
  );
  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly user$ = this.userSubject$.asObservable();
  public readonly users$ = this.usersSubject$.asObservable();
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  public fetchAllUser(): Observable<any> {
    const url = `${baseUrl}/users`;
    return this.http
      .get<any>(url)
      .pipe(tap((users) => this.usersSubject$.next(users)));
  }

  public signUp(user: User): Observable<User> {
    const url = `${baseUrl}/users`;
    return this.http.post<any>(url, user).pipe(
      tap(() => {
        this.router.navigate(['sign-in']);
      })
    );
  }

  public signIn(email: string, password: string): Observable<User> {
    const url = `${baseUrl}/users/login`;
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

  public logout(): void {
    this.userSubject$.next(undefined);
    if (localStorage.getItem('user')) {
      localStorage.clear();
    }
    this.router.navigate(['sign-in']).then(() => {
      this.store.dispatch(resetAppAction());
    });
  }
}
