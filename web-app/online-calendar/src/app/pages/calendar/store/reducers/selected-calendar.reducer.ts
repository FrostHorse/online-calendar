import { createReducer, on } from '@ngrx/store';
import { resetAppAction } from 'src/app/store/actions/reset-app.actions';
import {
  deselectCalendarAction,
  selectCalendarAction,
} from '../actions/calendar.actions';

const initialState: string = '';

export const selectedCalendarReducer = createReducer(
  initialState,
  on(selectCalendarAction, (state, { calendarId }) => calendarId),
  on(deselectCalendarAction, resetAppAction, (state) => initialState)
);
