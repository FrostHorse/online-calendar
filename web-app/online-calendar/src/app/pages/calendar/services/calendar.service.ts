import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from 'src/app/constants/baseUrl';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Calendar } from 'src/app/models/calendar/calendar';
import {
  selectCalendars,
  selectSelectedCalendar,
} from '../store/selectors/calendar.selector';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  public calendars$: Observable<Record<string, Calendar>>;
  public selectedCalendar$: Observable<Calendar>;
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly authService: AuthService
  ) {
    this.calendars$ = this.store.pipe(select(selectCalendars));
    this.selectedCalendar$ = this.store.pipe(select(selectSelectedCalendar));
  }

  public crateCalendar(name: string): Observable<any> {
    const url = `${baseUrl}/calendars`;
    return this.authService.user$.pipe(
      switchMap((user) =>
        this.http.post<any>(url, { name, ownerId: user?._id })
      ),
      tap(console.log)
    );
  }

  public loadCalendars(): Observable<Calendar[]> {
    const url = `${baseUrl}/calendars`;
    return this.http.get<Calendar[]>(url);
  }
}
