import { createReducer, on } from '@ngrx/store';
import { Appointment } from 'src/app/models/appointment/appointment';
import { loadAppointmentsAction } from '../actions/appointment.actions';

const initialState: Appointment[] = [];

export const appointmentReducer = createReducer(
  initialState,
  on(loadAppointmentsAction, (state, { appointments }) => [...appointments])
);
