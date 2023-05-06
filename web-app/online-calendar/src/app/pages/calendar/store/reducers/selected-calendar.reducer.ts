import { createReducer, on } from '@ngrx/store';
import { selectCalendarAction } from '../actions/calendar.actions';

const initialState: string = '';

export const selectedCalendarReducer = createReducer(
  initialState,
  on(selectCalendarAction, (state, { calendarId }) => calendarId)
);
