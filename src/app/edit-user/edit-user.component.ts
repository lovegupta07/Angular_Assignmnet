import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user: any;
  @Output() userUpdated = new EventEmitter();

  name: string = '';
  email: string = '';
  isAdmin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.user) {
      this.name = this.user.name;
      this.email = this.user.email;
      this.isAdmin = this.user.role === 'ADMIN';
    }
  };


  onUpdateUser(): void {
    console.log('isAdmin value:', this.isAdmin); 
    const payload = {
      name: this.name,
      role: this.isAdmin ? 'ADMIN' : 'USER',
    };

    this.userService.updateUser(this.user._id, payload).subscribe({
      next: () => {
        alert('User Updated Successfully!');
        this.userUpdated.emit();
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }
}