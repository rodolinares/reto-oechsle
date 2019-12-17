import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { FirestoreService, User } from '../services/firestore.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  avg = 0;
  stDev = 0;
  users: User[] = [];

  constructor(private firestore: FirestoreService) {}

  deleteUser(id: string) {
    this.firestore
      .deleteUser(id)
      .then(() => {
        this.listUsers();
      })
      .catch(err => {
        console.error(err);
      });
  }

  listUsers() {
    this.firestore.listUsers().subscribe(
      next => {
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
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.listUsers();
  }
}
