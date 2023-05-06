import { Calendar } from '../models/calendar/calendar';

export interface AppState {
  calendars: Record<string, Calendar>;
  selectedCalendar: string;
  isLoading?: boolean;
}
