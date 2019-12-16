import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface User {
  _id?: string;
  age?: number;
  birthDate: Date;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  deleteUser(id: string) {
    return this.firestore
      .collection('users')
      .doc(id)
      .delete();
  }

  listUsers() {
    return this.firestore.collection('users').get();
  }
}
