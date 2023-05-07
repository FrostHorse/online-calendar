import { createAction, props } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';

export const selectCalendarAction = createAction(
  '[Calendar] Select Calendar',
  props<{ calendarId: string }>()
);

export const nextCalendarAction = createAction('[Calendar] Next Calendar');
export const previousCalendarAction = createAction(
  '[Calendar] Previous Calendar'
);
export const fetchCalendarAction = createAction('[Calendar] Fetch Calendars');

export const loadCalendarsAction = createAction(
  '[Calendar] Load Calendars',
  props<{ calendars: Calendar[] }>()
);
