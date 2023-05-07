import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public close() {
    this.dialogRef.close();
  }
}
