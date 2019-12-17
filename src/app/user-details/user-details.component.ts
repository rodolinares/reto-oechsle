import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { FirestoreService, User } from '../services/firestore.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  id: string;
  loading = true;
  user: User;

  constructor(private firestore: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.firestore.readUser(this.id).subscribe(
      response => {
        const now = moment();
        const birthDate = moment.unix(response.get('birthDate').seconds);

        this.user = {
          _id: response.id,
          age: now.diff(birthDate, 'years'),
          birthDate: birthDate.toDate(),
          firstName: response.get('firstName'),
          lastName: response.get('lastName')
        };

        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }
}
