import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import {
  fetchCalendarAction,
  nextCalendarAction,
  previousCalendarAction,
} from 'src/app/pages/calendar/store/actions/calendar.actions';
import { AppointmentUtil } from 'src/app/utils/appointment.util';
import { AddAppointmentDialogComponent } from './components/add-appointment-dialog/add-appointment-dialog.component';
import { CreateCalendarDialogComponent } from './components/create-calendar-dialog/create-calendar-dialog.component';
import { DAYS } from './constants/days';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') public calendar: ElementRef | undefined;
  public hours: string[] = this.getHours();
  public days = this.getDays();
  public selectedCalendar$ = this.calendarService.selectedCalendar$.pipe(
    tap(console.log)
  );

  constructor(
    private readonly dialogService: DialogService,
    private readonly store: Store,
    private readonly calendarService: CalendarService
  ) {
    this.store.dispatch(fetchCalendarAction());
  }

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

  public openCreateCalendarDialog(): void {
    this.dialogService
      .open<CreateCalendarDialogComponent>(CreateCalendarDialogComponent, {
        title: 'Create Calendar',
      })
      .afterClosed()
      .pipe(
        switchMap((name) => this.calendarService.crateCalendar(name)),
        take(1)
      )
      .subscribe();
  }

  public nextCalendar(): void {
    this.store.dispatch(nextCalendarAction());
  }

  public previousCalendar(): void {
    this.store.dispatch(previousCalendarAction());
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
