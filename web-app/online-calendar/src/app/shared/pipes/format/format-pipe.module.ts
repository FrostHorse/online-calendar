import { NgModule } from '@angular/core';
import { FormatToTwoDigitPipe } from './format-to-two-digit.pipe';

@NgModule({
  declarations: [FormatToTwoDigitPipe],
  exports: [FormatToTwoDigitPipe],
})
export class FormatPipeModule {}
