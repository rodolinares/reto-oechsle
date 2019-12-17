import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ListUsersDialogComponent } from '../dialogs/list-users-dialog/list-users-dialog.component';
import { FirestoreService, User } from '../services/firestore.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  avg: number;
  loading = true;
  stDev: number;
  users: User[];

  constructor(public dialog: MatDialog, private firestore: FirestoreService) {}

  deleteUser(firstName: string, lastName: string, id: string) {
    this.openDialog('¡Atención!', `¿Desea eliminar el usuario '${firstName} ${lastName}'?`, id);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  }

  listUsers() {
    this.loading = true;

    this.firestore.listUsers().subscribe(
      next => {
        this.avg = 0;
        this.stDev = 0;

        this.users = next.docs.map(x => {
          const now = moment();
          const birthDate = moment.unix(x.get('birthDate').seconds);
          const age = now.diff(birthDate, 'years');
          this.avg += age;

          return {
            _id: x.id,
            age,
            birthDate: birthDate.toDate(),
            firstName: x.get('firstName'),
            lastName: x.get('lastName')
          };
        });

        // Calculo del promedio
        this.avg /= this.users.length;

        // Calculo de la desviacion estandar
        this.users.forEach(user => {
          this.stDev += Math.pow(Math.abs(user.age - this.avg), 2);
        });

        this.stDev = Math.sqrt(this.stDev / this.users.length);

        this.loading = false;
      },
      error => {
        console.error(error);
        this.openDialog('¡Error!', 'Ocurrió un problema al intentar listar los usuarios.');
        this.loading = false;
      }
    );
  }

  ngOnInit() {
    this.listUsers();
  }

  openDialog(title: string, content: string, id = null) {
    const dialogRef = this.dialog.open(ListUsersDialogComponent, { data: { title, content, id }, width: '300px' });

    dialogRef.afterClosed().subscribe(response => {
      if (response === 'success') {
        this.listUsers();
        this.openDialog(
          '¡Éxito!',
          'Se eliminó satisfactoriamente al usuario ' +
            `'${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}'.`
        );
      } else if (response === 'error') {
        this.openDialog(
          '¡Error!',
          'Ocurrió un problema al intentar eliminar al usuario ' +
            `'${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}'.`
        );
      }
    });
  }
}
