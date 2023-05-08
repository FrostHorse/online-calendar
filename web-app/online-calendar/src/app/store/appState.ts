import { Appointment } from '../models/appointment/appointment';
import { Calendar } from '../models/calendar/calendar';
import { SelectedWeekState } from './selectedWeekState';

export interface AppState {
  calendars: Record<string, Calendar>;
  selectedCalendar: string;
  selectedWeekState: SelectedWeekState;
  appointments: Record<string, Appointment>;
  isLoading?: boolean;
}
