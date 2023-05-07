import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { loadAppointmentsAction } from '../actions/appointment.actions';
import { initCalendarAction } from '../actions/init-calendar.actions';

@Injectable()
export class AppointmentEffects {
  fetchAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initCalendarAction),
      switchMap(() => this.appointmentService.loadAppointments()),
      map((appointments) => loadAppointmentsAction({ appointments }))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly appointmentService: AppointmentService
  ) {}
}
