import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from 'src/app/components/log-in/log-in.component';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { UserlistComponent } from './components/userlist/userlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  {
    path: 'users', canActivate: [AuthGuard], component: UsersComponent, children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },   
      { path: 'welcome', component: WelcomeComponent },
      { path: 'user-list', component: UserlistComponent },
      { path: 'add-user', component: InviteUserComponent }
    ]
  },
  { path: '**', redirectTo: '/login' } 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
