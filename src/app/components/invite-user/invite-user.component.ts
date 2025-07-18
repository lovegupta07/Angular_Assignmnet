import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent {
  name: string = '';
  email: string = '';
  usertype: string = '';
  isModalOpen = true;

  @Output() userAdded = new EventEmitter();
  @Output() userAddedAndNext = new EventEmitter();

  constructor(private userService: UserService) { }

  closeModal() {
    this.isModalOpen = false;
  }

  inviteUser() {

    if (!this.name || !this.email || !this.usertype) {
      alert('All fields are required');
      return;
    }

    const name = this.name;
    const email = this.email;
    const role = this.usertype;

    this.userService.inviteUser(name, email, role).subscribe({
      next: () => {
        alert('User Invited Successfully');
        this.userAdded.emit();
      },
      error: (error) => {
        console.log('Error Inviting User: ', error);
        alert('Invited Failed');
      }
    });
  };

  inviteUserAndNext() {

    if (!this.name || !this.email || !this.usertype) {
      alert('All fields are required');
      return;
    }

    const name = this.name;
    const email = this.email;
    const role = this.usertype;

    this.userService.inviteUser(name, email, role).subscribe({
      next: () => {
        alert('User Invited Successfully');
        this.userAddedAndNext.emit();
        this.name = '';
        this.email = '';
        this.usertype = '';
      },
      error: (error) => {
        console.log('Error Inviting User: ', error);
        alert('Invited Failed');
      }
    });
  };

}
