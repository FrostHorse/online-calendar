import { createReducer, on } from '@ngrx/store';
import {
  deselectCalendarAction,
  selectCalendarAction,
} from '../actions/calendar.actions';

const initialState: string = '';

export const selectedCalendarReducer = createReducer(
  initialState,
  on(selectCalendarAction, (state, { calendarId }) => calendarId),
  on(deselectCalendarAction, (state) => initialState)
);
