import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Calendar } from 'src/app/models/calendar/calendar';
import { Nullable } from 'src/app/models/nullable/nullable';
import {
  nextCalendarAction,
  previousCalendarAction,
} from '../../store/actions/calendar.actions';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss'],
})
export class CalendarPickerComponent {
  @Input() selectedCalendar: Nullable<Calendar>;
  constructor(private readonly store: Store) {}

  public nextCalendar(): void {
    this.store.dispatch(nextCalendarAction());
  }

  public previousCalendar(): void {
    this.store.dispatch(previousCalendarAction());
  }
}
