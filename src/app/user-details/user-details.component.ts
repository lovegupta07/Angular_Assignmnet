import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef
  imagePreview: string = 'https://via.placeholder.com/150';

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
      role: [''],
      status: ['Active']
    });

    this.loadProfile();
  }


  loadProfile(): void {
    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    const formData = this.userForm.getRawValue();

    // formData.name = user.name;
    // formData.phone = user.phone;
    // formData.email = user.email;
    // formData.role = user.role;

    this.userForm.patchValue({
      name: user.name || '',
      phone: user.mobile?.mobile_number || '',
      email: user.email || '',
      role: user.role || '',
      status: user.status || 'Active'
    });

  }


  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }


  removeImage() {
    this.imagePreview = '';
  }


  onSave() {
    if (this.userForm.valid) {
      const user = JSON.parse(localStorage.getItem('user_data') || '{}');
      const formData = this.userForm.getRawValue();

      const name = formData.name;
      const imageUrl = user.image?.url || this.imagePreview;
      const mobileNumber = formData.phone;
      const email = user.email || '';

      this.userService.updateUserProfile(
        name,
        mobileNumber,
      ).subscribe({
        next: (res) => {
          alert('Profile Updated Successfully');
          this.loadProfile();

          user.name = name;
          user.role = formData.role;
          user.status = formData.status;
          user.image = { url: imageUrl };

          localStorage.setItem('user_data', JSON.stringify(user));
        },
        error: (err) => {
          console.log("Error Updating user Profile", err);
        }
      });
    }
  }

}