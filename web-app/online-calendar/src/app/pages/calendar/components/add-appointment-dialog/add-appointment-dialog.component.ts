import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment/appointment';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';
import { FormatDateUtil } from 'src/app/utils/format-date.util';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss'],
})
export class AddAppointmentDialogComponent {
  public createAppointmentForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(1111, [
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    allDay: new FormControl(false),
    startDateHH: new FormControl('', [Validators.required]),
    startDateMM: new FormControl('', [Validators.required]),
    startDateD: new FormControl('', [Validators.required]),
    startDateM: new FormControl('', [Validators.required]),
    startDateYYYY: new FormControl('', [Validators.required]),
    endDateHH: new FormControl('', [Validators.required]),
    endDateMM: new FormControl('', [Validators.required]),
    endDateD: new FormControl('', [Validators.required]),
    endDateM: new FormControl('', [Validators.required]),
    endDateYYYY: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {
    this.setForm(data.data);
  }

  public close() {
    this.dialogRef.close();
  }

  public createAppointment(): void {}

  public formatToTwoDigit(
    formControlName: string,
    value: string,
    maxValue: number,
    dependentValue?: string
  ): void {
    let newValue = Number(value);
    if (newValue == 0 && (maxValue == 12 || maxValue == 31)) {
      newValue = 1;
    }
    if (maxValue <= newValue) {
      if (maxValue == 12) {
        newValue = maxValue;
      } else if (maxValue == 31) {
        if (
          [1, 3, 4, 5, 7, 9, 10, 12].some((n) => Number(dependentValue) == n)
        ) {
          newValue = maxValue;
        } else if (Number(dependentValue) == 2) {
          newValue = 28;
        } else {
          newValue = 30;
        }
      } else {
        newValue = 0;
      }
    }
    this.createAppointmentForm.patchValue({
      [formControlName]: FormatDateUtil.formatToTwoDigit(Number(newValue)),
    });
  }

  private setForm(data: Appointment): void {
    this.createAppointmentForm.patchValue({
      name: data.name,
      address: data.place.address,
      city: data.place.city,
      postalCode: data.place.postalCode,
      startDateYYYY: String(data.startDate.getFullYear()),
      startDateM: FormatDateUtil.formatToTwoDigit(
        data.startDate.getMonth() + 1
      ),
      startDateD: FormatDateUtil.formatToTwoDigit(data.startDate.getDay()),
      startDateHH: FormatDateUtil.formatToTwoDigit(data.startDate.getHours()),
      startDateMM: FormatDateUtil.formatToTwoDigit(data.startDate.getMinutes()),
      endDateYYYY: String(data.endDate.getFullYear()),
      endDateM: FormatDateUtil.formatToTwoDigit(data.endDate.getMonth() + 1),
      endDateD: FormatDateUtil.formatToTwoDigit(data.endDate.getDay()),
      endDateHH: FormatDateUtil.formatToTwoDigit(data.endDate.getHours()),
      endDateMM: FormatDateUtil.formatToTwoDigit(data.endDate.getMinutes()),
    });
  }
}