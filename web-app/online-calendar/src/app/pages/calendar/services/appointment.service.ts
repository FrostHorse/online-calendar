import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from 'src/app/constants/baseUrl';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Appointment } from 'src/app/models/appointment/appointment';
import { selectSelectedCalendarAppointments } from '../store/selectors/appointment.selector';
import { ConverterUtil } from './../../../utils/converter.util';
import { createAppointmentAction } from './../store/actions/appointment.actions';
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
    private readonly store: Store
  ) {}

  public loadAppointments(): Observable<Appointment[]> {
    const url = `${baseUrl}/events`;
    return this.http
      .get<Appointment[]>(url)
      .pipe(
        map((appointments) =>
          appointments.map((appointment) =>
            ConverterUtil.castObjectToAppointment(appointment)
          )
        )
      );
  }

  public createAppointment(appointment: Appointment): Observable<any> {
    const url = `${baseUrl}/events`;
    return this.authService.user$.pipe(
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
        })
      ),
      switchMap((appointment) =>
        this.calendarService
          .linkAppointmentToCalendar(appointment._id)
          .pipe(
            tap(() =>
              this.store.dispatch(
                createAppointmentAction({
                  appointment:
                    ConverterUtil.castObjectToAppointment(appointment),
                })
              )
            )
          )
      )
    );
  }
}
