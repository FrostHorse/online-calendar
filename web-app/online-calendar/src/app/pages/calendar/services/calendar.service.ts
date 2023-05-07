import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap, take } from 'rxjs';
import { baseUrl } from 'src/app/constants/baseUrl';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Calendar } from 'src/app/models/calendar/calendar';
import { ConverterUtil } from 'src/app/utils/converter.util';
import { createCalendarAction } from '../store/actions/calendar.actions';
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
      map((calendar) =>
        this.store.dispatch(
          createCalendarAction({
            calendar: ConverterUtil.castObjectToCalendar(calendar),
          })
        )
      )
    );
  }

  public editCalendar(calendar: Calendar): Observable<any> {
    const url = `${baseUrl}/calendars/${calendar._id}`;
    return this.http.patch<any>(url, {
      name: calendar.name,
      ownerId: calendar.ownerId,
    });
  }

  public removeCalendar(id: string): Observable<any> {
    const url = `${baseUrl}/calendars/${id}`;
    return this.http.delete<any>(url);
  }

  public loadCalendars(): Observable<Calendar[]> {
    const url = `${baseUrl}/calendars`;
    return this.http
      .get<Calendar[]>(url)
      .pipe(
        map((calendars) =>
          calendars.map((calendar) =>
            ConverterUtil.castObjectToCalendar(calendar)
          )
        )
      );
  }

  public linkAppointmentToCalendar(eventId: string): Observable<any> {
    const url = `${baseUrl}/calendars/addEvent`;
    return this.selectedCalendar$.pipe(
      take(1),
      switchMap(({ _id }) =>
        this.http.post<any>(url, { calendarId: _id, eventId })
      )
    );
  }
}
