import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BaseDialogModule } from 'src/app/shared/dialogs/base-dialog/base-dialog.module';
import { ConfirmDialogModule } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.module';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { FormatPipeModule } from 'src/app/shared/pipes/format/format-pipe.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { AddAppointmentDialogComponent } from './components/add-appointment-dialog/add-appointment-dialog.component';
import { CalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { CreateCalendarDialogComponent } from './components/create-calendar-dialog/create-calendar-dialog.component';
import { CreateCalendarComponent } from './components/create-calendar/create-calendar.component';
import { CurrentCalendarComponent } from './components/current-calendar/current-calendar.component';
import { EditAppointmentDialogComponent } from './components/edit-appointment-dialog/edit-appointment-dialog.component';
import { EditCalendarDialogComponent } from './components/edit-calendar-dialog/edit-calendar-dialog.component';
import { UserChipComponent } from './components/user-selector/user-chip/user-chip.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { WeekPickerComponent } from './components/week-picker/week-picker.component';
import { CalendarService } from './services/calendar.service';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    BaseDialogModule,
    ReactiveFormsModule,
    IconModule,
    FormatPipeModule,
    MatMenuModule,
    ConfirmDialogModule,
  ],
  declarations: [
    CalendarComponent,
    AddAppointmentDialogComponent,
    CreateCalendarDialogComponent,
    CreateCalendarComponent,
    EditCalendarDialogComponent,
    CurrentCalendarComponent,
    CalendarPickerComponent,
    WeekPickerComponent,
    EditAppointmentDialogComponent,
    UserSelectorComponent,
    UserChipComponent,
  ],
  exports: [CalendarComponent],
  providers: [CalendarService],
})
export class CalendarModule {}
