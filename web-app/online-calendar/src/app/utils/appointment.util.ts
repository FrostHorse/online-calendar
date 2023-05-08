import { defaultPlace } from '../constants/defaultPlace';
import { Appointment } from '../models/appointment/appointment';
import { DateUtils } from './date.utils';

export class AppointmentUtil {
  public static createBaseAppointment(
    selectedYear: number,
    selectedWeek: number,
    day: number,
    hour: number,
    appointment?: Partial<Appointment>
  ): Appointment {
    const startDate = DateUtils.calculateDate(
      selectedYear,
      selectedWeek,
      day,
      hour
    );
    const endDate = DateUtils.calculateDate(
      selectedYear,
      selectedWeek,
      day,
      hour + 1
    );
    return {
      _id: '',
      name: 'Appointment',
      place: defaultPlace,
      ownerId: '',
      startDate: startDate,
      endDate: endDate,
      comment: '-',
      allDay: false,
      recurring: false,
      ...appointment,
    };
  }
}
