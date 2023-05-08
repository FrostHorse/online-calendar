export class DateUtils {
  public static getCurrentWeekNumber(): number {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)
    );

    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  public static getWeekNumber(currentDate: Date): number {
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)
    );

    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  public static calculateDate(
    year: number,
    week: number,
    day: number,
    hour: number
  ): Date {
    const date = new Date(year, 0, 1);
    const weekMultiplier = week - 2 > 0 ? week - 2 : 1;
    const daysOfYear = weekMultiplier * 7 + (8 - date.getDay()) + day;
    date.setDate(daysOfYear);
    date.setHours(hour, 0, 0, 0);
    return date;
  }
}
