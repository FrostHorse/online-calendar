import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Nullable } from 'src/app/models/nullable/nullable';
import {
  nextWeekActions,
  previousWeekActions,
} from '../../store/actions/change-week.actions';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.scss'],
})
export class WeekPickerComponent {
  @Input() public selectedWeek: Nullable<number>;
  @Input() public selectedYear: Nullable<number>;
  constructor(private readonly store: Store) {}

  previousWeek() {
    this.store.dispatch(previousWeekActions());
  }
  nextWeek() {
    this.store.dispatch(nextWeekActions());
  }
}
