import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-del-dialog',
  templateUrl: './del-dialog.component.html',
  styleUrls: ['./del-dialog.component.css']
})
export class DelDialogComponent{

  constructor(
    private dialogRef: MatDialogRef<DelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string) { }

  closeDialog(){
    this.dialogRef.close();
  }
}
