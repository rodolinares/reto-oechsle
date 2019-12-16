import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { FirestoreService, User } from '../services/firestore.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  group: FormGroup;

  constructor(private builder: FormBuilder, private firestore: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.group = this.builder.group({
      birthDate: [, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.group.valid) {
      const raw = this.group.getRawValue();
      const user: User = {
        birthDate: moment(raw.birthDate).toDate(),
        firstName: raw.firstName,
        lastName: raw.lastName
      };

      this.firestore
        .createUser(user)
        .then(_ => {
          this.router.navigateByUrl('/list-users');
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.group.markAllAsTouched();
    }
  }
}
