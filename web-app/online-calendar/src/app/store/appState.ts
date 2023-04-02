import { CalendarState } from '../pages/calendar/store/calendarState';

export interface AppState {
  calendarState?: CalendarState;
  isLoading?: boolean;
}
