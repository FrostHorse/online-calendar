import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import {
  editCalendarAction,
  fetchCalendarAction,
  loadCalendarsAction,
  nextCalendarAction,
  previousCalendarAction,
  removeCalendarAction,
  selectCalendarAction,
} from '../actions/calendar.actions';

@Injectable()
export class CalendarEffects {
  selectNextCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextCalendarAction),
      concatLatestFrom(() => [
        this.calendarService.calendars$,
        this.calendarService.selectedCalendar$,
      ]),
      map(([, calendars, { _id }]) => {
        const calendarIds = Object.keys(calendars);
        const newIndex = calendarIds.indexOf(_id) + 1;
        const calendarId =
          newIndex < calendarIds.length
            ? calendarIds[newIndex]
            : calendarIds[0];
        return selectCalendarAction({ calendarId });
      })
    )
  );

  selectPreviousCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(previousCalendarAction),
      concatLatestFrom(() => [
        this.calendarService.calendars$,
        this.calendarService.selectedCalendar$,
      ]),
      map(([, calendars, { _id }]) => {
        const calendarIds = Object.keys(calendars);
        const newIndex = calendarIds.indexOf(_id) - 1;
        const calendarId =
          newIndex >= 0
            ? calendarIds[newIndex]
            : calendarIds[calendarIds.length - 1];
        return selectCalendarAction({ calendarId });
      })
    )
  );

  editCalendars$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editCalendarAction),
        switchMap(({ calendar }) => this.calendarService.editCalendar(calendar))
      ),
    { dispatch: false }
  );

  removeCalendars$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeCalendarAction),
        switchMap(({ calendarId }) =>
          this.calendarService.removeCalendar(calendarId)
        )
      ),
    { dispatch: false }
  );

  fetchCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCalendarAction),
      switchMap(() => this.calendarService.loadCalendars()),
      map((calendars) => loadCalendarsAction({ calendars }))
    )
  );

  /* selectCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCalendarsAction),
      map(({ calendars }) =>
        selectCalendarAction({ calendarId: calendars?.[0]?._id ?? '' })
      )
    )
  ); */

  constructor(
    private readonly actions$: Actions,
    private readonly calendarService: CalendarService
  ) {}
}
