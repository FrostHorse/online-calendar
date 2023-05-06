import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import {
  fetchCalendarActions,
  loadCalendarsActions,
  selectCalendarAction,
} from '../actions/calendar.actions';

@Injectable()
export class CalendarEffects {
  fetchCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCalendarActions),
      switchMap(() => this.calendarService.loadCalendars()),
      map((calendars) => loadCalendarsActions({ calendars }))
    )
  );

  selectCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCalendarsActions),
      map(({ calendars }) =>
        selectCalendarAction({ calendarId: calendars?.[0]?._id ?? '' })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly calendarService: CalendarService
  ) {}
}
