import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Injectable()
export class SignUpService {
  constructor(private readonly http: HttpClient) {}

  public createUser(user: User): Observable<User> {
    const url = 'http://localhost:3000/user';
    return this.http.post<any>(url, user).pipe(tap(() => console.log('asd')));
  }

  public login(email: string, password: string): Observable<User> {
    const url = 'http://localhost:3000/login';
    return this.http
      .post<any>(url, { email, password })
      .pipe(tap(() => console.log('asd')));
  }
}
