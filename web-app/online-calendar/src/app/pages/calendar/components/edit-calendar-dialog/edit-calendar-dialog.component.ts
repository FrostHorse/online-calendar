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
  public editCalendarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    users: new FormControl([] as User[]),
  });
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {
    this.setForm(data.data);
  }

  public setForm(name: string): void {
    this.editCalendarForm.patchValue({ name });
  }

  public editCalendar() {
    if (this.editCalendarForm.valid) {
      this.dialogRef.close(this.editCalendarForm.value.name);
    }
  }

  public selectUser(user: User) {
    const users = this.editCalendarForm.value.users;
    if (users && !users?.find(({ _id }) => _id === user._id)) {
      this.editCalendarForm.patchValue({ users: [...users, user] });
    }
  }

  public removeUser(userId: string) {
    const users = this.editCalendarForm.value.users;
    if (users) {
      this.editCalendarForm.patchValue({
        users: users.filter(({ _id }) => _id !== userId),
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
