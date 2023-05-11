import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import {
  editAppointmentAction,
  loadAppointmentsAction,
  removeAppointmentAction,
} from '../actions/appointment.actions';
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

  removeOnEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editAppointmentAction),
      filter(
        ({ removeAppointmentForCurrentUser }) =>
          !!removeAppointmentForCurrentUser
      ),
      map(({ appointment }) =>
        removeAppointmentAction({ appointmentId: appointment._id })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly appointmentService: AppointmentService
  ) {}
}
