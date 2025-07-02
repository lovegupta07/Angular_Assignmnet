import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  get emailInvalid(): boolean {
  return this.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
}

get passwordInvalid(): boolean {
  return this.password !== '' && this.password.trim() === '';
}


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.emailInvalid && !this.passwordInvalid) {
      alert('Login submitted!');
    }
  }
}
