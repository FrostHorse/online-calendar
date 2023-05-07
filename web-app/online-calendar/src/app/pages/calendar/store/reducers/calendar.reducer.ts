import { createReducer, on } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';
import { loadCalendarsAction } from '../actions/calendar.actions';

const initialState = {};

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
  )
);
