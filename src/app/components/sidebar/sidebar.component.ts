import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userName = user.name || '';
    this.userRole = user.role || '';
  }

  // Load users from API
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

  // Search users based on text
  searchUsers(): void {
    this.userService.searchUsers(this.searchText, this.sortField, this.sortOrder).subscribe({
      next: (res) => {
        this.users = res?.responseData || [];
        this.totalUsers = res?.pagination_details?.total_records || 0;
      },
      error: (error) => {
        console.log("Error Fetching Users: ", error);
      }
    });
  }

  // Handle Sidebar Toggle
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

  onUserAddedAndNext() {
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

  logout() {
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
