import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDialogModule } from 'src/app/shared/dialogs/base-dialog/base-dialog.module';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { FormatPipeModule } from 'src/app/shared/pipes/format/format-pipe.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { AddAppointmentDialogComponent } from './components/add-appointment-dialog/add-appointment-dialog.component';
import { CreateCalendarDialogComponent } from './components/create-calendar-dialog/create-calendar-dialog.component';
import { CalendarService } from './services/calendar.service';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    BaseDialogModule,
    ReactiveFormsModule,
    IconModule,
    FormatPipeModule,
  ],
  declarations: [
    CalendarComponent,
    AddAppointmentDialogComponent,
    CreateCalendarDialogComponent,
  ],
  exports: [CalendarComponent],
  providers: [CalendarService],
})
export class CalendarModule {}
