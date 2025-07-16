import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input() deleteUserId!: string;
  @Output() userDeleted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  name: string = '';
  email: string = '';
  usertype: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
 
  }

  confirmDelete() {
  this.userService.deleteUser(this.deleteUserId).subscribe({
    next: () => {
      alert('User Deleted Successfully');
      this.userDeleted.emit();
    },
    error: (err) => {
      console.log("Error Deleting the User", err);
    }
  });
}

cancelDelete() {
  this.cancel.emit(); // Notify parent to close the modal
}

}