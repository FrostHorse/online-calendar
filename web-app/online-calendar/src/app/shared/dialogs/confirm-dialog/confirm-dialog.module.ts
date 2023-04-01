import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
