import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDialogModule } from 'src/app/shared/dialogs/base-dialog/base-dialog.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { AddAppointmentDialogComponent } from './components/add-appointment-dialog/add-appointment-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    BaseDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [CalendarComponent, AddAppointmentDialogComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
