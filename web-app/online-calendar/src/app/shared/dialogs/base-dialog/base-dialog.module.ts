import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../../icon/icon.module';
import { BaseDialogComponent } from './base-dialog.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [BaseDialogComponent],
  exports: [BaseDialogComponent],
})
export class BaseDialogModule {}
