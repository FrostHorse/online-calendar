import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Appointment } from 'src/app/models/appointment/appointment';
import { DateUtils } from 'src/app/utils/date.utils';
import { selectSelectedCalendar } from './calendar.selector';
import { selectSelectedWeek, selectSelectedYear } from './week.selector';

export const selectAppointments =
  createFeatureSelector<Record<string, Appointment>>('appointments');

export const selectSelectedCalendarAppointments = createSelector(
  selectAppointments,
  selectSelectedCalendar,
  selectSelectedWeek,
  selectSelectedYear,
  (appointments, selectedCalendar, selectedWeek) =>
    Object.values(appointments).filter(
      (appointment) =>
        selectedCalendar.appointmentIds?.some((a) => a === appointment._id) &&
        (DateUtils.getWeekNumber(appointment.startDate) === selectedWeek ||
          DateUtils.getWeekNumber(appointment.endDate) === selectedWeek)
    )
);
