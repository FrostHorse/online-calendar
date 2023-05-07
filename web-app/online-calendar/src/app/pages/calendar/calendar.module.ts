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
import { EditCalendarDialogComponent } from './components/edit-calendar-dialog/edit-calendar-dialog.component';
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
  ],
  exports: [CalendarComponent],
  providers: [CalendarService],
})
export class CalendarModule {}
