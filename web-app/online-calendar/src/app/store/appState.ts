import { Appointment } from '../models/appointment/appointment';
import { Calendar } from '../models/calendar/calendar';

export interface AppState {
  calendars: Record<string, Calendar>;
  selectedCalendar: string;
  appointments: Record<string, Appointment>;
  isLoading?: boolean;
}
