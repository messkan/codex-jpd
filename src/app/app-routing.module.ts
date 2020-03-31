import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { ErrorComponent } from './error/error.component';
import { UsersUpdateComponent } from './pages/users/users-update/users-update.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersAddComponent } from './pages/users/users-add/users-add.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          allowedRole: ['ROLE_RESPONSABLE']
        },
        children: [
          {
            path: '' ,
            component: UsersListComponent
          },
          {
            path: 'addUser', 
            component: UsersAddComponent
          },
          {
            path: 'update/:id',
            component: UsersUpdateComponent,
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
