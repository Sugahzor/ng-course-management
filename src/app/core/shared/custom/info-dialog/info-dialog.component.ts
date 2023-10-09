import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialogRef: MatDialogRef<InfoDialogComponent>
  ) {}

  confirmAndClose() {
    this.dialogRef.close();
    return this.data.onOkClicked();
  }

  cancel() {
    this.dialogRef.close();
  }
}
