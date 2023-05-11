import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map, switchMap, take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from 'src/app/constants/baseUrl';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Appointment } from 'src/app/models/appointment/appointment';
import { isStrictDefined } from 'src/app/utils/condition-checks.util';
import { EditAppointmentDialogComponent } from '../components/edit-appointment-dialog/edit-appointment-dialog.component';
import { selectSelectedCalendarAppointments } from '../store/selectors/appointment.selector';
import { DialogService } from './../../../core/dialog/dialog.service';
import { ConverterUtil } from './../../../utils/converter.util';
import {
  createAppointmentAction,
  editAppointmentAction,
  removeAppointmentAction,
} from './../store/actions/appointment.actions';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  public readonly appointments$: Observable<Appointment[]> = this.store.pipe(
    select(selectSelectedCalendarAppointments)
  );
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly calendarService: CalendarService,
    private readonly dialogService: DialogService,
    private readonly store: Store
  ) {}

  public loadAppointments(): Observable<Appointment[]> {
    const url = `${baseUrl}/events`;
    return this.authService.user$.pipe(
      switchMap((user) =>
        this.http
          .get<Appointment[]>(url)
          .pipe(
            map((appointments: Appointment[]) =>
              appointments
                .filter(
                  (appointment) =>
                    appointment.participants?.some(
                      ({ participantId }) => participantId === user?._id
                    ) || appointment.ownerId === user?._id
                )
                .map((appointment) =>
                  ConverterUtil.castObjectToAppointment(appointment)
                )
            )
          )
      )
    );
  }

  public createAppointment(appointment: Appointment): Observable<any> {
    const url = `${baseUrl}/events`;
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) =>
        this.http.post<any>(url, {
          name: appointment.name,
          ownerId: user?._id,
          place: appointment.place,
          startDate: appointment.startDate,
          endDate: appointment.endDate,
          comment: appointment.comment,
          allDay: appointment.allDay,
          recurring: appointment.recurring,
          participants: appointment.participants ?? [],
        })
      ),
      switchMap((appointment) =>
        this.calendarService.linkAppointmentToCalendar(appointment._id).pipe(
          tap(() =>
            this.store.dispatch(
              createAppointmentAction({
                appointment: ConverterUtil.castObjectToAppointment(appointment),
              })
            )
          )
        )
      )
    );
  }

  public editAppointmentAction(appointment: Appointment): Observable<any> {
    const url = `${baseUrl}/events/${appointment._id}`;
    return this.http
      .patch<any>(url, {
        name: appointment.name,
        ownerId: appointment.ownerId,
        place: appointment.place,
        startDate: appointment.startDate,
        endDate: appointment.endDate,
        comment: appointment.comment,
        allDay: appointment.allDay,
        recurring: appointment.recurring,
        participants: appointment.participants,
      })
      .pipe(
        tap(() => this.store.dispatch(editAppointmentAction({ appointment })))
      );
  }

  public removeAppointmentAction(appointmentId: string): Observable<any> {
    const url = `${baseUrl}/events/${appointmentId}`;
    return this.http
      .delete<any>(url)
      .pipe(
        tap(() =>
          this.store.dispatch(removeAppointmentAction({ appointmentId }))
        )
      );
  }

  public openEditAppointment(appointmentId: string): void {
    combineLatest([this.appointments$, this.authService.users$])
      .pipe(
        take(1),
        switchMap(([appointments, users]) => {
          const appointment = appointments.find(
            ({ _id }) => _id === appointmentId
          );
          return this.dialogService
            .open<EditAppointmentDialogComponent>(
              EditAppointmentDialogComponent,
              {
                title: 'Edit appointment',
                data: {
                  appointment,
                  users: users.filter(({ _id }) =>
                    appointment?.participants?.some(
                      ({ participantId }) => participantId === _id
                    )
                  ),
                },
              }
            )
            .afterClosed()
            .pipe(
              filter(isStrictDefined),
              switchMap((appointment) => {
                if (appointment === 'remove') {
                  return this.removeAppointmentAction(appointmentId);
                }
                return this.editAppointmentAction(appointment);
              })
            );
        })
      )
      .subscribe();
  }
}
