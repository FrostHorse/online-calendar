import { createAction, props } from '@ngrx/store';
import { Appointment } from 'src/app/models/appointment/appointment';

export const loadAppointmentsAction = createAction(
  '[Appointment] Create appointment',
  props<{ appointments: Appointment[] }>()
);

export const createAppointmentAction = createAction(
  '[Appointment] Crate appointment',
  props<{ appointment: Appointment }>()
);

export const editAppointmentAction = createAction(
  '[Appointment] Edit appointment',
  props<{
    appointment: Appointment;
    removeAppointmentForCurrentUser?: boolean;
  }>()
);

export const removeAppointmentAction = createAction(
  '[Appointment] Remove appointment',
  props<{ appointmentId: string }>()
);
