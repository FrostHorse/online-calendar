import { Place } from './place';

export interface Appointment {
  id: string;
  name: string;
  place: Place;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  comment: string;
  allDay: boolean;
  recurring: boolean;
}
