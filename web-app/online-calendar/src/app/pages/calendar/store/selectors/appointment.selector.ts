import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Appointment } from 'src/app/models/appointment/appointment';
import { selectSelectedCalendar } from './calendar.selector';

export const selectAppointments =
  createFeatureSelector<Record<string, Appointment>>('appointments');

export const selectSelectedCalendarAppointments = createSelector(
  selectAppointments,
  selectSelectedCalendar,
  (appointments, selectedCalendar) =>
    Object.values(appointments).filter((appointment) =>
      selectedCalendar.appointmentIds?.some((a) => a === appointment._id)
    )
);
