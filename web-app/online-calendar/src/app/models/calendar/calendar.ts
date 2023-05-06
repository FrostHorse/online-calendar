import { Appointment } from '../appointment/appointment';

export interface Calendar {
  _id: string;
  name: string;
  ownerId: string;
  appointments: Appointment[];
}
