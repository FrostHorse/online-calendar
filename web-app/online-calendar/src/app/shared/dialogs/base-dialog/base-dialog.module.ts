import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseDialogComponent],
  exports: [BaseDialogComponent],
})
export class BaseDialogModule {}
