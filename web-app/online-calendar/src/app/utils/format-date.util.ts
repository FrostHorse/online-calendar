export class FormatDateUtil {
  public static formatToTwoDigit(digit: number): string {
    return digit < 10 ? `0${digit}` : `${digit}`;
  }
}
