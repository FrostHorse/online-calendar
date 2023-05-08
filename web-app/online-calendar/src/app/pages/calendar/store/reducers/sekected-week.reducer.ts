import { createReducer, on } from '@ngrx/store';
import { resetAppAction } from 'src/app/store/actions/reset-app.actions';
import { SelectedWeekState } from 'src/app/store/selectedWeekState';
import { DateUtils } from 'src/app/utils/date.utils';
import {
  nextWeekActions,
  previousWeekActions,
} from '../actions/change-week.actions';

const initialState: SelectedWeekState = {
  selectedWeek: DateUtils.getCurrentWeekNumber(),
  selectedYear: new Date().getFullYear(),
};

export const selectedWeekReducer = createReducer(
  initialState,
  on(nextWeekActions, (state) => {
    const newState = { ...state, selectedWeek: state.selectedWeek + 1 };
    if (newState.selectedWeek < 52) {
      return newState;
    }
    return { ...state, selectedYear: state.selectedYear + 1, selectedWeek: 1 };
  }),
  on(previousWeekActions, (state) => {
    const newState = { ...state, selectedWeek: state.selectedWeek - 1 };
    if (newState.selectedWeek > 0) {
      return newState;
    }
    return { ...state, selectedYear: state.selectedYear - 1, selectedWeek: 52 };
  }),
  on(resetAppAction, (state) => initialState)
);
