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
  userImage: string = '';
  collapsed: boolean = false;
  userDetails: boolean = false;
  addInviteModal: boolean = false;
  filterModal: boolean = false;
  editUser: any | null = null;
  deleteUserId: string | null = null;
  settingsDropdownVisible: boolean = false;
  changePasswordModal: boolean = false;

  users: any[] = [];
  searchText: string = '';
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
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res?.responseData || [];
        this.totalUsers = res?.pagination_details?.total_records || 0;
      },
      error: (error) => {
        console.log("Error Fetching Users: ", error);
      }
    });
  }

  // Search users from the API
  searchUsers(): void {
    this.userService.searchUsers(this.searchText, this.sortField, this.sortOrder).subscribe({
      next: (res:any) => {
        this.users = res?.responseData || [];
        this.totalUsers = res?.pagination_details?.total_records || 0;
      },
      error: (error:any) => {
        console.log("Error Fetching Users: ", error);
      }
    });
  }

  // Search functionality for filtering users
  onSearch(): void {
    this.searchUsers();
  }

  // Delete a user
  deleteUser(userId: string): void {
    // if (confirm('Are you sure you want to delete this user?')) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        alert('User Deleted');
        this.loadUsers();
        console.log('User deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
    // }
  }

  getUserImage(userId: string) {
    this.userService.getUserImage(userId).subscribe({
      next: (res) => {
        this.userImage = res.image?.url;
      },
      error: (err) => {
        console.log("Error Fetching User ProfileImage: ", err);
      }
    })
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

  onUserAdded() {
    this.closeAddInviteModal();
    this.loadUsers();
  }

  closeFilterModal() {
    this.filterModal = false;
  }

  openEditUserModal(user: any): void {
    this.editUser = user;
  }

  closeEditUserModal(): void {
    this.editUser = null;
  }

  onUserUpdated() {
    this.closeEditUserModal();
    this.loadUsers();
  }

  openDeleteUserModal(userId: string): void {
    this.deleteUserId = userId;
  }

  closeDeleteUserModal() {
    this.deleteUserId = null;
  }

  onUserDeleted() {
    this.closeDeleteUserModal();
    this.loadUsers();
  }

  toggleSettingsDropdown() {
    this.settingsDropdownVisible = !this.settingsDropdownVisible;
  }

  logout(){
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }

  openChangePasswordModal() {
    this.changePasswordModal = true;
  }

  closeChangePasswordModal() {
    this.changePasswordModal = false;
  }

}