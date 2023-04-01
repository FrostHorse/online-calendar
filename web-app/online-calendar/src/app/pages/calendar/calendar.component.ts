import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
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
    console.log(day, startHour);
    this.dialogService.open(ConfirmDialogComponent);
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
