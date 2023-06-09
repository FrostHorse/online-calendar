import { createReducer, on } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';
import { resetAppAction } from 'src/app/store/actions/reset-app.actions';
import {
  createCalendarAction,
  editCalendarAction,
  loadCalendarsAction,
  removeCalendarAction,
} from '../actions/calendar.actions';
import { removeCalendarForUserAction } from './../actions/calendar.actions';

const initialState: Record<string, Calendar> = {};

export const calendarReducer = createReducer(
  initialState,
  on(loadCalendarsAction, (state, { calendars }) =>
    calendars.reduce(
      (calendarMap: Record<string, Calendar>, calendar: Calendar) => {
        calendarMap[calendar._id] = calendar;
        return calendarMap;
      },
      {}
    )
  ),
  on(createCalendarAction, editCalendarAction, (state, { calendar }) =>
    Object.assign({ ...state }, { [calendar._id]: calendar })
  ),
  on(
    removeCalendarAction,
    removeCalendarForUserAction,
    (state, { calendarId }) => {
      const newState = { ...state };
      delete newState[calendarId];
      return newState;
    }
  ),
  on(resetAppAction, (state) => initialState)
);
