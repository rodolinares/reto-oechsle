import { Component, OnInit } from '@angular/core';

import DATA from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  average = 0;
  stDev = 0;
  sumSqDist = 0;
  users = DATA;

  constructor() {}

  async ngOnInit() {
    // Calcular edades
    this.users.forEach(user => {
      const birthDate: Date = user.birthDate;
      const now = new Date();
      const age = now.getUTCFullYear() - birthDate.getUTCFullYear();
      user.age = age;
      this.average += age;
    });

    // Obtener el promedio
    this.average /= this.users.length;

    this.users.forEach(user => {
      this.sumSqDist += Math.pow(Math.abs(user.age - this.average), 2);
    });

    this.stDev = Math.sqrt(this.sumSqDist / this.users.length);
  }
}
