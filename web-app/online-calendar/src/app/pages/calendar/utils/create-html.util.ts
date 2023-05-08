export class CreateHtmlUtil {
  public static createAppointment(
    titleText: string,
    selectedWeek: number,
    startWeek: number,
    currentWeek: number,
    startDay: number,
    startHour: number,
    endDay: number = startDay,
    endHour: number = startHour + 1,
    topRadius?: string
  ): void {
    const startColumn = document.getElementById(`${startDay}-${startHour}`);
    if (startColumn) {
      const container = document.createElement('div');
      container.classList.add('appointment-container');
      container.id = 'appointment';

      const appointment = document.createElement('div');
      appointment.classList.add('appointment');
      const title = document.createElement('div');
      title.classList.add('title');
      title.innerText = titleText;
      let diff = endHour - startHour;
      if (topRadius?.length) {
        appointment.style.borderTopLeftRadius = topRadius;
        appointment.style.borderTopRightRadius = topRadius;
      }
      if (startDay === endDay && selectedWeek === currentWeek) {
        if (startHour + diff <= 24) {
          const width = startColumn.offsetWidth - 2;
          const height = startColumn.offsetHeight * diff - diff / 3 - 1;
          appointment.style.width = `${width}px`;
          appointment.style.height = `${height}px`;
        }
      } else {
        if (currentWeek < selectedWeek) {
          this.createAppointment(
            titleText,
            selectedWeek,
            startWeek,
            currentWeek + 1,
            1,
            0,
            endDay,
            endHour,
            '0px'
          );
          return;
        } else if (startWeek !== selectedWeek && currentWeek === selectedWeek) {
          this.createAppointment(
            titleText,
            selectedWeek,
            selectedWeek,
            selectedWeek,
            1,
            0,
            endDay,
            endHour,
            '0px'
          );
          return;
        } else {
          this.createAppointment(
            titleText,
            selectedWeek,
            startWeek,
            currentWeek,
            startDay + 1,
            0,
            endDay,
            endHour,
            '0px'
          );
          diff = 24 - startHour;
          const width = startColumn.offsetWidth;
          const height = startColumn.offsetHeight * diff - diff / 3;
          appointment.style.width = `${width}px`;
          appointment.style.height = `${height}px`;
          appointment.style.borderBottomLeftRadius = '0px';
          appointment.style.borderBottomRightRadius = '0px';
        }
      }
      appointment.appendChild(title);
      container.appendChild(appointment);
      startColumn.appendChild(container);
    }
  }
}
