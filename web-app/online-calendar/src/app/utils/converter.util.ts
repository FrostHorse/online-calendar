import { Calendar } from '../models/calendar/calendar';

export class ConverterUtil {
  public static castObjectToCalendar(object: any): Calendar {
    return {
      _id: object._id,
      name: object.name,
      ownerId: object.ownerId,
      appointments: object.eventIds,
    };
  }
}
