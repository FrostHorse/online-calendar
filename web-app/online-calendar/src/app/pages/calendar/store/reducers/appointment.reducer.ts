import { createReducer, on } from '@ngrx/store';
import { Appointment } from 'src/app/models/appointment/appointment';
import {
  createAppointmentAction,
  editAppointmentAction,
  loadAppointmentsAction,
  removeAppointmentAction,
} from '../actions/appointment.actions';

const initialState: Record<string, Appointment> = {};

export const appointmentReducer = createReducer(
  initialState,
  on(loadAppointmentsAction, (state, { appointments }) =>
    appointments.reduce(
      (appointmentMap: Record<string, Appointment>, calendar: Appointment) => {
        appointmentMap[calendar._id] = calendar;
        return appointmentMap;
      },
      {}
    )
  ),
  on(createAppointmentAction, editAppointmentAction, (state, { appointment }) =>
    Object.assign({ ...state }, { [appointment._id]: appointment })
  ),
  on(removeAppointmentAction, (state, { appointmentId }) => {
    const newState = { ...state };
    delete newState[appointmentId];
    return newState;
  })
);
