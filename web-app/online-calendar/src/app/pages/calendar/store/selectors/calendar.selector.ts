import { createFeatureSelector } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';

export const selectCalendars =
  createFeatureSelector<Record<string, Calendar>>('calendars');
