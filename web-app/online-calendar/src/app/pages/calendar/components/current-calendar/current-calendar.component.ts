import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { Appointment } from 'src/app/models/appointment/appointment';
import { Nullable } from 'src/app/models/nullable/nullable';
import { AppointmentUtil } from 'src/app/utils/appointment.util';
import { isStrictDefined } from 'src/app/utils/condition-checks.util';
import { DateUtils } from 'src/app/utils/date.utils';
import { DAYS } from '../../constants/days';
import { AppointmentService } from '../../services/appointment.service';
import { CreateHtmlService } from '../../services/create-html.service';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';

@Component({
  selector: 'app-current-calendar',
  templateUrl: './current-calendar.component.html',
  styleUrls: ['./current-calendar.component.scss'],
})
export class CurrentCalendarComponent implements AfterViewInit {
  @Input() selectedWeek: Nullable<number>;
  @Input() selectedYear: Nullable<number>;
  @Input() set appointments(value: Nullable<Appointment[]>) {
    setTimeout(() => {
      this.removeAppointments();
      value?.forEach(({ _id, name, startDate, endDate }) => {
        this.cdr.detectChanges();
        this.createHtmlService.createAppointment(
          _id,
          name,
          this.selectedWeek ?? DateUtils.getCurrentWeekNumber(),
          DateUtils.getWeekNumber(startDate),
          DateUtils.getWeekNumber(startDate),
          startDate.getDay() == 0 ? 7 : startDate.getDay(),
          startDate.getHours(),
          startDate.getMinutes(),
          endDate.getDay() == 0 ? 7 : endDate.getDay(),
          endDate.getHours(),
          endDate.getMinutes()
        );
      });
      this.cdr.detectChanges();
    }, 200);
  }

  @ViewChild('calendar') public calendar: ElementRef | undefined;
  public hours: string[] = this.getHours();
  public days = this.getDays();

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly dialogService: DialogService,
    private readonly createHtmlService: CreateHtmlService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.calendar?.nativeElement.scroll(0, 410);
  }

  public openAppointmentCreation(day: number, startHour: number): void {
    const data = AppointmentUtil.createBaseAppointment(
      this.selectedYear ?? new Date().getFullYear(),
      this.selectedWeek ?? DateUtils.getCurrentWeekNumber(),
      day,
      startHour
    );
    this.dialogService
      .open<AddAppointmentDialogComponent>(AddAppointmentDialogComponent, {
        title: 'Create appointment',
        data,
      })
      .afterClosed()
      .pipe(
        filter(isStrictDefined),
        switchMap((appointment) =>
          this.appointmentService.createAppointment(appointment)
        )
      )
      .subscribe();
  }

  public identify(index: number, item: string) {
    return item;
  }

  private removeAppointments(): void {
    let appointment = document.getElementById('appointment');
    while (appointment) {
      appointment.remove();
      appointment = document.getElementById('appointment');
    }
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
