import { Appointment } from '../models/appointment/appointment';
import { Calendar } from '../models/calendar/calendar';

export class ConverterUtil {
  public static castToCalendar(object: any, userIds: string[]): Calendar {
    return {
      _id: object._id,
      name: object.name,
      ownerId: object.ownerId,
      appointmentIds: object.eventIds,
      userIds,
    };
  }

  public static castObjectToAppointment(object: any): Appointment {
    console.log(object);
    return {
      ...object,
      startDate: new Date(object.startDate),
      endDate: new Date(object.endDate),
    };
  }
}
