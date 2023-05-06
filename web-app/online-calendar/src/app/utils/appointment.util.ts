import { defaultPlace } from '../constants/defaultPlace';
import { Appointment } from '../models/appointment/appointment';

export class AppointmentUtil {
  public static createBaseAppointment(
    appointment?: Partial<Appointment>
  ): Appointment {
    return {
      id: '',
      name: 'Appointment',
      place: defaultPlace,
      ownerId: '',
      startDate: new Date(),
      endDate: new Date(),
      comment: '',
      allDay: false,
      recurring: false,
      ...appointment,
    };
  }
}
