import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { Calendar } from 'src/app/models/calendar/calendar';
import {
  editCalendarAction,
  removeCalendarAction,
  selectCalendarAction,
} from 'src/app/pages/calendar/store/actions/calendar.actions';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { isStrictDefined } from 'src/app/utils/condition-checks.util';
import { CreateCalendarDialogComponent } from './components/create-calendar-dialog/create-calendar-dialog.component';
import { EditCalendarDialogComponent } from './components/edit-calendar-dialog/edit-calendar-dialog.component';
import { AppointmentService } from './services/appointment.service';
import { CalendarService } from './services/calendar.service';
import { initCalendarAction } from './store/actions/init-calendar.actions';
import {
  selectSelectedWeek,
  selectSelectedYear,
} from './store/selectors/week.selector';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public calendars$ = this.calendarService.calendars$;
  public selectedCalendar$ = this.calendarService.selectedCalendar$;
  public appointments$ = this.appointmentService.appointments$;
  public selectedWeek$ = this.store.pipe(select(selectSelectedWeek));
  public selectedYear$ = this.store.pipe(select(selectSelectedYear));
  private allUser$ = this.authService.users$;

  constructor(
    private readonly dialogService: DialogService,
    private readonly store: Store,
    private readonly calendarService: CalendarService,
    private readonly appointmentService: AppointmentService,
    private readonly authService: AuthService
  ) {
    this.store.dispatch(initCalendarAction());
  }

  public selectCalendar(calendarId: string): void {
    this.store.dispatch(selectCalendarAction({ calendarId }));
  }

  public openCreateCalendarDialog(): void {
    this.dialogService
      .open<CreateCalendarDialogComponent>(CreateCalendarDialogComponent, {
        title: 'Create Calendar',
      })
      .afterClosed()
      .pipe(
        filter(isStrictDefined),
        switchMap(({ name, userIds }) =>
          this.calendarService.crateCalendar(name, userIds)
        ),
        take(1)
      )
      .subscribe();
  }

  public openEditCalendarDialog(calendar: Calendar): void {
    combineLatest([this.allUser$, this.authService.user$])
      .pipe(
        take(1),
        switchMap(([users, user]) =>
          this.dialogService
            .open<EditCalendarDialogComponent>(EditCalendarDialogComponent, {
              title: 'Edit Calendar',
              data: {
                name: calendar.name,
                users: users.filter(({ _id }) =>
                  calendar.userIds.some(
                    (id) => id === _id && calendar.ownerId !== _id
                  )
                ),
              },
            })
            .afterClosed()
            .pipe(
              filter(isStrictDefined),
              map(({ name, userIds, removedUserIds }) =>
                this.store.dispatch(
                  editCalendarAction({
                    calendar: { ...calendar, name, userIds },
                    removedUserIds,
                    removeCalendarForCurrentUser: !(
                      calendar.ownerId === user?._id ||
                      userIds.some((id: string) => id === user?._id)
                    ),
                  })
                )
              ),
              take(1)
            )
        )
      )

      .subscribe();
  }

  public openRemoveCalendarDialog(calendar: Calendar): void {
    this.dialogService
      .open<ConfirmDialogComponent>(ConfirmDialogComponent, {
        title: 'Remove Calendar',
        data: {
          message: `The ${calendar.name} calendar will be permanently deleted.`,
        },
      })
      .afterClosed()
      .pipe(
        filter(isStrictDefined),
        map(
          (confirm) =>
            confirm &&
            this.store.dispatch(
              removeCalendarAction({ calendarId: calendar._id })
            )
        ),
        take(1)
      )
      .subscribe();
  }
}
