import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list-users',
    pathMatch: 'full'
  },
  {
    path: 'list-users',
    component: ListUsersComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
