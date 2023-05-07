import { Appointment } from '../models/appointment/appointment';
import { Calendar } from '../models/calendar/calendar';

export class ConverterUtil {
  public static castObjectToCalendar(object: any): Calendar {
    return {
      _id: object._id,
      name: object.name,
      ownerId: object.ownerId,
      appointmentIds: object.eventIds,
    };
  }

  public static castObjectToAppointment(object: any): Appointment {
    return {
      ...object,
      startDate: new Date(object.startDate),
      endDate: new Date(object.endDate),
    };
  }
}
