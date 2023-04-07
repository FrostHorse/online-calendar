import { Component, Inject } from '@angular/core';
import { DialogData } from 'src/app/models/dialog/dialog-data';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}

  public close() {
    this.dialogRef.close();
  }
}
