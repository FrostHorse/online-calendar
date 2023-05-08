import { Injectable } from '@angular/core';
import { FormatUtil } from 'src/app/utils/format-date.util';
import { AppointmentService } from './appointment.service';

@Injectable({
  providedIn: 'root',
})
export class CreateHtmlService {
  constructor(private readonly appointmentService: AppointmentService) {}

  public createAppointment(
    appointmentId: string,
    titleText: string,
    selectedWeek: number,
    startWeek: number,
    currentWeek: number,
    startDay: number,
    startHour: number,
    startMinute: number,
    endDay: number = startDay,
    endHour: number = startHour + 1,
    endMinute: number,
    topRadius?: string
  ): void {
    const startColumn = document.getElementById(`${startDay}-${startHour}`);
    if (startColumn) {
      const container = document.createElement('div');
      container.classList.add('appointment-container');
      container.id = 'appointment';

      container.addEventListener('click', (event) => {
        event.stopPropagation();
        this.appointmentService.openEditAppointment(appointmentId);
      });

      const appointment = document.createElement('div');
      appointment.classList.add('appointment');
      const title = document.createElement('div');
      title.classList.add('title');
      let diff = endHour - startHour;
      if (topRadius?.length) {
        appointment.style.borderTopLeftRadius = topRadius;
        appointment.style.borderTopRightRadius = topRadius;
      }
      if (startDay === endDay && selectedWeek === currentWeek) {
        if (startHour + diff <= 24) {
          const width = startColumn.offsetWidth - 2;
          const height = startColumn.offsetHeight * diff - diff / 3 - 1;
          appointment.style.width = `${width}px`;
          appointment.style.height = `${height}px`;
          title.innerHTML = this.createTileText(
            titleText,
            startHour,
            startMinute,
            endHour,
            endMinute
          );
        }
      } else {
        if (currentWeek < selectedWeek) {
          this.createAppointment(
            appointmentId,
            titleText,
            selectedWeek,
            startWeek,
            currentWeek + 1,
            1,
            0,
            0,
            endDay,
            endHour,
            0,
            '0px'
          );
          return;
        } else if (startWeek !== selectedWeek && currentWeek === selectedWeek) {
          this.createAppointment(
            appointmentId,
            titleText,
            selectedWeek,
            selectedWeek,
            selectedWeek,
            1,
            0,
            0,
            endDay,
            endHour,
            0,
            '0px'
          );
          return;
        } else {
          this.createAppointment(
            appointmentId,
            titleText,
            selectedWeek,
            startWeek,
            currentWeek,
            startDay + 1,
            0,
            0,
            endDay,
            endHour,
            0,
            '0px'
          );
          diff = 24 - startHour;
          const width = startColumn.offsetWidth;
          const height = startColumn.offsetHeight * diff - diff / 3;
          appointment.style.width = `${width}px`;
          appointment.style.height = `${height}px`;
          appointment.style.borderBottomLeftRadius = '0px';
          appointment.style.borderBottomRightRadius = '0px';
          title.innerHTML = this.createTileText(
            titleText,
            startHour,
            startMinute,
            24,
            0
          );
        }
      }
      appointment.appendChild(title);
      container.appendChild(appointment);
      startColumn.appendChild(container);
    }
  }

  private createTileText(
    titleText: string,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ): string {
    return `${titleText}<br>${FormatUtil.formatToTwoDigit(
      startHour
    )}:${FormatUtil.formatToTwoDigit(
      startMinute
    )} - ${FormatUtil.formatToTwoDigit(endHour)}:${FormatUtil.formatToTwoDigit(
      endMinute
    )}`;
  }
}
