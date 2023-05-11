import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { Appointment } from 'src/app/models/appointment/appointment';
import { Participant } from 'src/app/models/appointment/participant';
import { Place } from 'src/app/models/appointment/place';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';
import { FormatUtil } from 'src/app/utils/format-date.util';

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.scss'],
})
export class EditAppointmentDialogComponent {
  public editAppointmentForm = new FormGroup({
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
    this.setForm(data.data.appointment, data.data.users);
  }

  public close() {
    this.dialogRef.close();
  }

  public selectUser(user: User) {
    const users = this.editAppointmentForm.value.users;
    if (users && !users?.find(({ _id }) => _id === user._id)) {
      this.editAppointmentForm.patchValue({ users: [...users, user] });
    }
  }

  public removeUser(userId: string) {
    const users = this.editAppointmentForm.value.users;
    if (users) {
      this.editAppointmentForm.patchValue({
        users: users.filter(({ _id }) => _id !== userId),
      });
    }
  }

  public editAppointment(): void {
    const appointment = this.editAppointmentFromForm();
    this.dialogRef.close(appointment);
  }

  public removeAppointment(): void {
    this.dialogRef.close('remove');
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
    this.editAppointmentForm.patchValue({
      [formControlName]: FormatUtil.formatToTwoDigit(Number(newValue)),
    });
  }

  private editAppointmentFromForm(): Appointment {
    return {
      ...this.data.data.appointment,
      name: this.editAppointmentForm.value.name,
      place: this.createPlace(),
      startDate: this.createStartDate(),
      endDate: this.createEndDate(),
      comment: this.editAppointmentForm.value.comment,
      allDay: this.editAppointmentForm.value.allDay,
      recurring: false,
      participants: this.createParticipants(),
    };
  }

  private createParticipants(): Participant[] {
    const participants: Participant[] = [];
    this.editAppointmentForm.value.users?.forEach((user) => {
      if (user._id) {
        participants.push({ participantId: user._id, canModify: true });
      }
    });

    return participants;
  }

  private createPlace(): Place {
    return {
      address: this.editAppointmentForm.value.address ?? '',
      city: this.editAppointmentForm.value.city ?? '',
      postalCode: this.editAppointmentForm.value.postalCode ?? 0,
    };
  }

  private createStartDate(): Date {
    const value = this.editAppointmentForm.value;
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
    const value = this.editAppointmentForm.value;
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

  private setForm(appointment: Appointment, users: User[]): void {
    this.editAppointmentForm.patchValue({
      name: appointment.name,
      comment: appointment.comment,
      address: appointment.place.address,
      city: appointment.place.city,
      postalCode: appointment.place.postalCode,
      startDateYYYY: String(appointment.startDate.getFullYear()),
      startDateM: FormatUtil.formatToTwoDigit(
        appointment.startDate.getMonth() + 1
      ),
      startDateD: FormatUtil.formatToTwoDigit(appointment.startDate.getDate()),
      startDateHH: FormatUtil.formatToTwoDigit(
        appointment.startDate.getHours()
      ),
      startDateMM: FormatUtil.formatToTwoDigit(
        appointment.startDate.getMinutes()
      ),
      endDateYYYY: String(appointment.endDate.getFullYear()),
      endDateM: FormatUtil.formatToTwoDigit(appointment.endDate.getMonth() + 1),
      endDateD: FormatUtil.formatToTwoDigit(appointment.endDate.getDate()),
      endDateHH: FormatUtil.formatToTwoDigit(appointment.endDate.getHours()),
      endDateMM: FormatUtil.formatToTwoDigit(appointment.endDate.getMinutes()),
      users,
    });
  }
}
