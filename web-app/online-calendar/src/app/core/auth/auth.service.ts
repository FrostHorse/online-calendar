import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, take, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject$ = new Subject<User>();
  public readonly user$ = this.userSubject$.asObservable();
  constructor(private readonly http: HttpClient) {
    this.fetchAllUser().pipe(take(1)).subscribe();
  }

  public fetchAllUser(): Observable<any> {
    const url = 'http://localhost:3000/users';
    return this.http.get<any>(url).pipe(tap(console.log));
  }

  public signUp(user: User): Observable<User> {
    const url = 'http://localhost:3000/users';
    return this.http
      .post<any>(url, user)
      .pipe(tap(() => console.log('userCreated')));
  }

  public signIn(email: string, password: string): Observable<User> {
    const url = 'http://localhost:3000/users/login';
    return this.http.post<any>(url, { email, password }).pipe(
      tap((user) => {
        console.log('userLoggedIn', user);
        this.userSubject$.next(user);
      })
    );
  }
}
