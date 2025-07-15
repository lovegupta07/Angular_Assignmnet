import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { FilterComponent } from './filter/filter.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UserDetailsComponent,
    InviteUserComponent,
    FilterComponent,
    EditUserComponent,
    DeleteUserComponent,
    ChangePasswordComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
