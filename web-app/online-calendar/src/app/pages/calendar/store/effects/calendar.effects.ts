import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { isStrictDefined } from 'src/app/utils/condition-checks.util';
import { CalendarService } from '../../services/calendar.service';
import { createAppointmentAction } from '../actions/appointment.actions';
import {
  deselectCalendarAction,
  editCalendarAction,
  loadCalendarsAction,
  nextCalendarAction,
  previousCalendarAction,
  removeCalendarAction,
  removeCalendarForUserAction,
  selectCalendarAction,
} from '../actions/calendar.actions';
import { initCalendarAction } from '../actions/init-calendar.actions';

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
        switchMap(({ calendar, removedUserIds }) =>
          this.calendarService.editCalendar(calendar, removedUserIds)
        )
      ),
    { dispatch: false }
  );

  removeOnEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editCalendarAction),
      filter(
        ({ removeCalendarForCurrentUser }) => !!removeCalendarForCurrentUser
      ),
      map(({ calendar }) =>
        removeCalendarForUserAction({ calendarId: calendar._id })
      )
    )
  );

  removeCalendarsForUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeCalendarForUserAction),
        concatLatestFrom(() =>
          this.authService.user$.pipe(filter(isStrictDefined))
        ),
        switchMap(([{ calendarId }, { _id }]) =>
          this.calendarService.unlinkUserToCalendar(calendarId, _id)
        )
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
      ofType(initCalendarAction, createAppointmentAction),
      switchMap(() => this.authService.fetchAllUser()),
      switchMap(() => this.calendarService.loadCalendars()),
      map((calendars) => loadCalendarsAction({ calendars }))
    )
  );

  saveSelectedCalendarToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectCalendarAction),
        tap(({ calendarId }) => {
          localStorage.setItem('selectedCalendar', calendarId);
        })
      ),
    { dispatch: false }
  );

  removeSelectedCalendarFromStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deselectCalendarAction),
        tap(() => {
          if (localStorage.getItem('selectedCalendar')?.length) {
            localStorage.removeItem('selectedCalendar');
          }
        })
      ),
    { dispatch: false }
  );

  selectFromStorageCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCalendarsAction),
      map(({ calendars }) => {
        const localCalendarId = localStorage.getItem('selectedCalendar') ?? '';
        const calendarId = calendars.some(({ _id }) => localCalendarId === _id)
          ? localCalendarId
          : '';
        return selectCalendarAction({ calendarId });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly calendarService: CalendarService,
    private readonly authService: AuthService
  ) {}
}
