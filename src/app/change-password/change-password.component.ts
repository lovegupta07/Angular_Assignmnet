import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  newPassword: string = '';
  oldPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) { }

  changePassword() {

    if (!this.newPassword || !this.oldPassword || !this.confirmPassword) {
      alert('All fields are required');
      return;
    }

    if(this.newPassword !== this.confirmPassword){
      alert("Password do not match.")
    }

    this.userService.changePassword(this.newPassword, this.oldPassword).subscribe({
      next: (res:any) => {
        alert("Password Changed Successfully");
      },
      error: (err:any) => {
        console.log(err);
      }
    })

  };

}