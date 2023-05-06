import { createAction, props } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';

export const selectCalendarAction = createAction(
  '[Calendar] Select Calendar',
  props<{ calendarId: string }>()
);

export const fetchCalendarActions = createAction('[Calendar] Fetch Calendars');

export const loadCalendarsActions = createAction(
  '[Calendar] Load Calendars',
  props<{ calendars: Calendar[] }>()
);
