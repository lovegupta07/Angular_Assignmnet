import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './users/users.component';
import { FilterComponent } from './filter/filter.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'welcome', canActivate: [AuthGuard], component: UsersComponent },
      { path: 'aa', component: FilterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
