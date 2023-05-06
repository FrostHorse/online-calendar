import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';

export const selectCalendars =
  createFeatureSelector<Record<string, Calendar>>('calendars');

export const selectSelectedCalendarId =
  createFeatureSelector<string>('selectedCalendar');

export const selectSelectedCalendar = createSelector(
  selectSelectedCalendarId,
  selectCalendars,
  (calendarId, calendars) => calendars[calendarId]
);
