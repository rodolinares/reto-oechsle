import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-list-users-dialog',
  templateUrl: './list-users-dialog.component.html',
  styleUrls: ['./list-users-dialog.component.scss']
})
export class ListUsersDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private firestore: FirestoreService
  ) {}

  deleteUser(id: string) {
    this.firestore
      .deleteUser(id)
      .then(() => {
        this.dialogRef.close('success');
      })
      .catch(err => {
        console.error(err);
        this.dialogRef.close('error');
      });
  }

  ngOnInit() {}

  onClose(id: string) {
    this.deleteUser(id);
  }
}
