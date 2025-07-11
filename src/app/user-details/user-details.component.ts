import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm!: FormGroup;
  imagePreview: string = 'https://via.placeholder.com/150';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['Vivek Bisht', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['Web Developer'],
      status: ['Active']
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
    this.imagePreview = 'https://via.placeholder.com/150';
  }

  onSave() {
    if (this.userForm.valid) {
      const formData = this.userForm.getRawValue();
      console.log('Submitted Data:', formData);
    }
  }

  
}