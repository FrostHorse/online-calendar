import { Component, Inject } from '@angular/core';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss'],
})
export class AddAppointmentDialogComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}

  public close() {
    this.dialogRef.close();
  }

  public addAppointment() {
    this.dialogRef.close();
  }
}
