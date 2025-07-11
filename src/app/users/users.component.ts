import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userName: string = '';
  userRole: string = '';
  collapsed: boolean = false;
  userDetails: boolean = false;
  addInviteModal: boolean = false;
  filterModal: boolean = false;

  users: any[] = [];
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  sortOrder: string = 'ASC';  // Default
  sortField: string = 'name';
  totalUsers: number = 0;

  constructor(private userService: UserService, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userName = user.name || '';
    this.userRole = user.role || '';
  };

  ngOnInit(): void {
    this.loadUsers();
  }


  // Load users from the API
  loadUsers(): void {
    this.userService.getUsers(this.searchText, this.pageSize, this.currentPage, this.sortField, this.sortOrder).subscribe({
      next: (res) => {
        this.users = res?.responseData || [];
        console.log(this.users);
        this.totalUsers = res?.pagination_details?.total_records || 0;
      },
      error: (error) => {
        console.log("Error Fetching Users: ", error);
      }
    });
  }

  // Search functionality for filtering users
  onSearch(): void {
    this.loadUsers(); 
  }

  // Redirect to Edit User screen
  editUser(userId: string): void {
    this.router.navigate(['/edit-user', userId]);  // Use Angular router to navigate
  }

  // Delete a user
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          this.loadUsers();  // Refresh the user list after deletion
          console.log('User deleted successfully');
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }


  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  closeUserDetails() {
    this.userDetails = false;
  }

  openAddInviteModal() {
    this.addInviteModal = true;
  }

  closeAddInviteModal() {
    this.addInviteModal = false;
  }

  closeFilterModal() {
    this.filterModal = false;
  }

}