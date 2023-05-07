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
import { DAYS } from '../../constants/days';
import { AppointmentService } from '../../services/appointment.service';
import { CreateHtmlUtil } from '../../utils/create-html.util';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';

@Component({
  selector: 'app-current-calendar',
  templateUrl: './current-calendar.component.html',
  styleUrls: ['./current-calendar.component.scss'],
})
export class CurrentCalendarComponent implements AfterViewInit {
  @Input() set appointments(value: Nullable<Appointment[]>) {
    value?.forEach(({ name, startDate, endDate }) => {
      CreateHtmlUtil.createAppointment(
        name,
        startDate.getDay(),
        startDate.getHours(),
        endDate.getDay(),
        endDate.getHours()
      );
    });
    this.cdr.detectChanges();
  }
  @ViewChild('calendar') public calendar: ElementRef | undefined;
  public hours: string[] = this.getHours();
  public days = this.getDays();

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.calendar?.nativeElement.scroll(0, 410);
  }

  public openAppointmentCreation(day: number, startHour: number): void {
    const startDate = this.calculateDate(day, startHour);
    const endDate = this.calculateDate(day, startHour + 1);
    const data = AppointmentUtil.createBaseAppointment({ startDate, endDate });
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
