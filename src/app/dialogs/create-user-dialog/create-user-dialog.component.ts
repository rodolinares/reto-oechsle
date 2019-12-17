import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private router: Router
  ) {}

  ngOnInit() {}

  onClose(error: boolean) {
    if (!error) {
      this.router.navigateByUrl('/list-users');
    }

    this.dialogRef.close();
  }
}
