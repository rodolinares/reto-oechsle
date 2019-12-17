import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { CreateUserDialogComponent } from '../dialogs/create-user-dialog/create-user-dialog.component';
import { FirestoreService, User } from '../services/firestore.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  group: FormGroup;
  loading = false;

  constructor(public dialog: MatDialog, private builder: FormBuilder, private firestore: FirestoreService) {}

  ngOnInit() {
    this.group = this.builder.group({
      birthDate: [, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.group.valid) {
      this.loading = true;
      const raw = this.group.getRawValue();
      const user: User = {
        birthDate: moment(raw.birthDate).toDate(),
        firstName: raw.firstName,
        lastName: raw.lastName
      };

      this.firestore
        .createUser(user)
        .then(_ => {
          this.loading = false;
          this.openDialog('¡Éxito!', 'El usuario ha sido creado satisfactoriamente.');
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
          this.openDialog('¡Error!', 'Ocurrió un problema al intentar crear el usuario.', true);
        });
    } else {
      this.group.markAllAsTouched();
    }
  }

  openDialog(title: string, content: string, error = false) {
    this.dialog.open(CreateUserDialogComponent, { data: { title, content, error }, width: '300px' });
  }
}
