import { Component, Inject } from '@angular/core';
import { DialogRef } from 'src/app/models/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/models/dialog/dialog-tokens';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss'],
})
export class BaseDialogComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) {}

  public close() {
    this.dialogRef.close();
  }
}
