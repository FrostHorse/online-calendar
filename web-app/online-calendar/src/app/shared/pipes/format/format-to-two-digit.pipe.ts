import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtil } from 'src/app/utils/format-date.util';

@Pipe({
  name: 'format-to-two-digit',
})
export class FormatToTwoDigitPipe implements PipeTransform {
  transform(digit: number): any {
    return FormatUtil.formatToTwoDigit(digit);
  }
}
