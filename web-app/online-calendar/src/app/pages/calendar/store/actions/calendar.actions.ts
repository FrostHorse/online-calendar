import { createAction, props } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';

export const selectCalendarAction = createAction(
  '[Calendar] Select Calendar',
  props<{ calendarId: string }>()
);

export const deselectCalendarAction = createAction(
  '[Calendar] Deselect Calendar'
);

export const nextCalendarAction = createAction('[Calendar] Next Calendar');
export const previousCalendarAction = createAction(
  '[Calendar] Previous Calendar'
);

export const loadCalendarsAction = createAction(
  '[Calendar] Load Calendars',
  props<{ calendars: Calendar[] }>()
);

export const createCalendarAction = createAction(
  '[Calendar] Create Calendar',
  props<{ calendar: Calendar }>()
);
export const editCalendarAction = createAction(
  '[Calendar] Edit Calendar',
  props<{
    calendar: Calendar;
    removedUserIds: string[];
    removeCalendarForCurrentUser?: boolean;
  }>()
);
export const removeCalendarAction = createAction(
  '[Calendar] Remove Calendar',
  props<{ calendarId: string }>()
);

export const removeCalendarForUserAction = createAction(
  '[Calendar] Remove Calendar For User',
  props<{ calendarId: string }>()
);
