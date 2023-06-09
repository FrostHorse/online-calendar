import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { Appointment } from 'src/app/models/appointment/appointment';
import { Place } from 'src/app/models/appointment/place';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';
import { FormatUtil } from 'src/app/utils/format-date.util';
import { Participant } from './../../../../models/appointment/participant';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss'],
})
export class AddAppointmentDialogComponent {
  public createAppointmentForm = new FormGroup({
    name: new FormControl(''),
    comment: new FormControl(''),
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
    users: new FormControl([] as User[]),
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

  public createAppointment(): void {
    const appointment = this.createAppointmentFromForm();
    this.dialogRef.close(appointment);
  }

  public selectUser(user: User) {
    const users = this.createAppointmentForm.value.users;
    if (users && !users?.find(({ _id }) => _id === user._id)) {
      this.createAppointmentForm.patchValue({ users: [...users, user] });
    }
  }

  public removeUser(userId: string) {
    const users = this.createAppointmentForm.value.users;
    if (users) {
      this.createAppointmentForm.patchValue({
        users: users.filter(({ _id }) => _id !== userId),
      });
    }
  }

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
      [formControlName]: FormatUtil.formatToTwoDigit(Number(newValue)),
    });
  }

  private createAppointmentFromForm(): Appointment {
    return {
      ...this.data.data,
      name: this.createAppointmentForm.value.name,
      place: this.createPlace(),
      startDate: this.createStartDate(),
      endDate: this.createEndDate(),
      comment: this.createAppointmentForm.value.comment,
      allDay: this.createAppointmentForm.value.allDay,
      recurring: false,
      participants: this.createParticipants(),
    };
  }

  private createParticipants(): Participant[] {
    const participants: Participant[] = [];
    this.createAppointmentForm.value.users?.forEach((user) => {
      if (user._id) {
        participants.push({ participantId: user._id, canModify: true });
      }
    });

    return participants;
  }

  private createPlace(): Place {
    return {
      address: this.createAppointmentForm.value.address ?? '',
      city: this.createAppointmentForm.value.city ?? '',
      postalCode: this.createAppointmentForm.value.postalCode ?? 0,
    };
  }

  private createStartDate(): Date {
    const value = this.createAppointmentForm.value;
    return new Date(
      Number(value.startDateYYYY),
      Number(value.startDateM) - 1,
      Number(value.startDateD),
      Number(value.startDateHH),
      Number(value.startDateMM),
      0,
      0
    );
  }

  private createEndDate(): Date {
    const value = this.createAppointmentForm.value;
    return new Date(
      Number(value.endDateYYYY),
      Number(value.endDateM) - 1,
      Number(value.endDateD),
      Number(value.endDateHH),
      Number(value.endDateMM),
      0,
      0
    );
  }

  private setForm(data: Appointment): void {
    this.createAppointmentForm.patchValue({
      name: data.name,
      comment: data.comment,
      address: data.place.address,
      city: data.place.city,
      postalCode: data.place.postalCode,
      startDateYYYY: String(data.startDate.getFullYear()),
      startDateM: FormatUtil.formatToTwoDigit(data.startDate.getMonth() + 1),
      startDateD: FormatUtil.formatToTwoDigit(data.startDate.getDate()),
      startDateHH: FormatUtil.formatToTwoDigit(data.startDate.getHours()),
      startDateMM: FormatUtil.formatToTwoDigit(data.startDate.getMinutes()),
      endDateYYYY: String(data.endDate.getFullYear()),
      endDateM: FormatUtil.formatToTwoDigit(data.endDate.getMonth() + 1),
      endDateD: FormatUtil.formatToTwoDigit(data.endDate.getDate()),
      endDateHH: FormatUtil.formatToTwoDigit(data.endDate.getHours()),
      endDateMM: FormatUtil.formatToTwoDigit(data.endDate.getMinutes()),
    });
  }
}
