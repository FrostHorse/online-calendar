import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { AppointmentUtil } from 'src/app/utils/appointment.util';
import { AddAppointmentDialogComponent } from './components/add-appointment-dialog/add-appointment-dialog.component';
import { DAYS } from './constants/days';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') public calendar: ElementRef | undefined;
  public hours: string[] = this.getHours();
  public days = this.getDays();

  constructor(private readonly dialogService: DialogService) {}

  public ngAfterViewInit(): void {
    this.calendar?.nativeElement.scroll(0, 410);
  }

  public openAppointmentCreation(day: number, startHour: number): void {
    const startDate = this.calculateDate(day, startHour);
    const endDate = this.calculateDate(day, startHour + 1);
    const data = AppointmentUtil.createBaseAppointment({ startDate, endDate });
    this.dialogService.open<AddAppointmentDialogComponent>(
      AddAppointmentDialogComponent,
      {
        title: 'Create appointment',
        data,
      }
    );
  }

  private calculateDate(day: number, hour: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + (day - date.getDay()));
    date.setHours(hour, 0, 0, 0);
    return date;
  }

  private getHours(): string[] {
    const hours: string[] = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i}:00`);
    }
    return hours;
  }
  private getDays(): string[] {
    return [''].concat(Object.values(DAYS));
  }
}
