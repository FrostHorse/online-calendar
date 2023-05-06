import { Pipe, PipeTransform } from '@angular/core';
import { FormatDateUtil } from 'src/app/utils/format-date.util';

@Pipe({
  name: 'format-to-two-digit',
})
export class FormatToTwoDigitPipe implements PipeTransform {
  transform(digit: number): any {
    return FormatDateUtil.formatToTwoDigit(digit);
  }
}
