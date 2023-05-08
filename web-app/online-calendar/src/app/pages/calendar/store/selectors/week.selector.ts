import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectedWeekState } from 'src/app/store/selectedWeekState';

export const selectSelectedWeekState =
  createFeatureSelector<SelectedWeekState>('selectedWeekState');

export const selectSelectedWeek = createSelector(
  selectSelectedWeekState,
  (state) => state.selectedWeek
);
export const selectSelectedYear = createSelector(
  selectSelectedWeekState,
  (state) => state.selectedYear
);
