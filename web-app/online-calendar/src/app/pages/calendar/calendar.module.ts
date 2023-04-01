import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [CommonModule, CalendarRoutingModule, ConfirmDialogModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
