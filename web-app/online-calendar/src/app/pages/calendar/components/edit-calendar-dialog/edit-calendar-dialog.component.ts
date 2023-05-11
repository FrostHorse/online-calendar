import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';

@Component({
  selector: 'app-edit-calendar-dialog',
  templateUrl: './edit-calendar-dialog.component.html',
  styleUrls: ['./edit-calendar-dialog.component.scss'],
})
export class EditCalendarDialogComponent {
  private removedUserIds: string[] = [];
  public editCalendarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    users: new FormControl([] as User[]),
  });
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {
    this.setForm(data.data.name, data.data.users);
  }

  public setForm(name: string, users: User[]): void {
    this.editCalendarForm.patchValue({ name, users });
  }

  public editCalendar() {
    if (this.editCalendarForm.valid) {
      this.dialogRef.close({
        name: this.editCalendarForm.value.name,
        userIds: this.editCalendarForm.value.users?.map(({ _id }) => _id) ?? [],
        removedUserIds: this.removedUserIds,
      });
    }
  }

  public selectUser(user: User) {
    const users = this.editCalendarForm.value.users;
    if (users && !users?.find(({ _id }) => _id === user._id)) {
      this.editCalendarForm.patchValue({ users: [...users, user] });
    }
    if (users && this.removedUserIds?.some((id) => id === user._id)) {
      this.removedUserIds = this.removedUserIds.filter((id) => id !== user._id);
    }
  }

  public removeUser(userId: string) {
    const users = this.editCalendarForm.value.users;
    if (users) {
      this.editCalendarForm.patchValue({
        users: users.filter(({ _id }) => _id !== userId),
      });
      if (!this.removedUserIds.some((id) => id === userId)) {
        this.removedUserIds.push(userId);
      }
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
