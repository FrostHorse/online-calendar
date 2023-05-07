import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calendar } from 'src/app/models/calendar/calendar';
import { Nullable } from 'src/app/models/nullable/nullable';

@Component({
  selector: 'app-create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.scss'],
})
export class CreateCalendarComponent {
  @Input() public calendars: Nullable<Record<string, Calendar>>;
  @Output() private createCalendar = new EventEmitter<void>();
  @Output() private editCalendar = new EventEmitter<Calendar>();
  @Output() private removeCalendar = new EventEmitter<Calendar>();
  @Output() private selectCalendar = new EventEmitter<string>();

  constructor() {}

  public openCreateCalendarDialog(): void {
    this.createCalendar.next();
  }

  public openEditCalendarDialog(calendar: Calendar): void {
    this.editCalendar.next(calendar);
  }

  public openRemoveCalendarDialog(calendar: Calendar): void {
    this.removeCalendar.next(calendar);
  }

  public selectedCalendar(event: any, calendarId: string): void {
    if (event.target.classList[0] === 'calendar-tile') {
      this.selectCalendar.next(calendarId);
    }
  }
}
