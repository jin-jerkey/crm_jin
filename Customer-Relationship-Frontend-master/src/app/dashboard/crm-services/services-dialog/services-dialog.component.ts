import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface DialogData {
  title: string;
  description:string;
  address:string;
  email:string;
  phone:string
}
@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.css']
})
export class ServicesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
