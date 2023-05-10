import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, filter, forkJoin, map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Calendar } from 'src/app/models/calendar/calendar';
import { isStrictDefined } from 'src/app/utils/condition-checks.util';
import { ConverterUtil } from 'src/app/utils/converter.util';
import { createCalendarAction } from '../store/actions/calendar.actions';
import {
  selectCalendars,
  selectSelectedCalendar,
} from '../store/selectors/calendar.selector';
import { baseUrl } from './../../../constants/baseUrl';

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

  public crateCalendar(name: string, userIds: string[]): Observable<any> {
    const url = `${baseUrl}/calendars`;
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) =>
        this.http
          .post<any>(url, { name, ownerId: user?._id })
          .pipe(
            switchMap((calendar) =>
              forkJoin(
                [...userIds, calendar.ownerId].map((userId) =>
                  this.linkUserToCalendar(calendar._id, userId)
                )
              ).pipe(map(() => calendar))
            )
          )
      ),
      map((calendar) =>
        this.store.dispatch(
          createCalendarAction({
            calendar: ConverterUtil.castToCalendar(calendar, [...userIds]),
          })
        )
      )
    );
  }

  private linkUserToCalendar(
    calendarId: string,
    userId: string,
    canModify = true
  ): Observable<any> {
    const url = `${baseUrl}/users/addCalendar`;
    return this.http.post<any>(url, { userId, calendarId, canModify });
  }

  public editCalendar(calendar: Calendar): Observable<any> {
    const url = `${baseUrl}/calendars/${calendar._id}`;
    return this.http
      .patch<any>(url, {
        name: calendar.name,
        ownerId: calendar.ownerId,
      })
      .pipe(
        switchMap(() =>
          forkJoin(
            calendar.userIds.map((userId) =>
              this.linkUserToCalendar(calendar._id, userId)
            )
          )
        )
      );
  }

  public removeCalendar(id: string): Observable<any> {
    const url = `${baseUrl}/calendars/${id}`;
    return this.http.delete<any>(url);
  }

  public loadCalendars(): Observable<Calendar[]> {
    const url = `${baseUrl}/users/visibleCalendars`;
    return this.authService.user$.pipe(
      filter(isStrictDefined),
      take(1),
      switchMap((user) =>
        this.http.get<any[]>(`${url}/${user?._id}`).pipe(
          map((calendars) =>
            calendars
              .filter(({ calendar }) => isStrictDefined(calendar))
              .map(({ calendar }) => calendar)
          ),
          switchMap((calendars: any[]) =>
            forkJoin(
              calendars
                .filter((calendar) => isStrictDefined(calendar))
                .map((calendar) =>
                  this.fetchUserIdsOfCalendar(calendar._id).pipe(
                    map((userIds) =>
                      ConverterUtil.castToCalendar(calendar, userIds)
                    )
                  )
                )
            ).pipe(map((calendars) => calendars.flat()))
          )
        )
      )
    );
  }

  public fetchUserIdsOfCalendar(calendarId: string): Observable<string[]> {
    const url = `${baseUrl}/users/get/${calendarId}`;
    return this.http.get<string[]>(url);
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
