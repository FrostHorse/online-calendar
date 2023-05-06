import { createAction, props } from '@ngrx/store';
import { Appointment } from 'src/app/models/appointment/appointment';

export const loadAppointmentsAction = createAction(
  '[Appointment] Create appointment',
  props<{ appointments: Appointment[] }>()
);
