import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';

@Component({
  selector: 'app-create-calendar-dialog',
  templateUrl: './create-calendar-dialog.component.html',
  styleUrls: ['./create-calendar-dialog.component.scss'],
})
export class CreateCalendarDialogComponent {
  public createCalendarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}

  public createCalendar() {
    if (this.createCalendarForm.valid) {
      this.dialogRef.close(this.createCalendarForm.value.name);
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
