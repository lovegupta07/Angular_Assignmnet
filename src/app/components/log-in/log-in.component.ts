import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid'; // ✅ If you need unique ID per session (optional)

@Component({
  selector: 'app-log-in', // ✅ Match your file/folder name
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  errorMessage = '';
  isLoggedIn = false;
  userFirstName = '';
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const token = localStorage.getItem('x-auth-token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      this.router.navigate(['/users/welcome']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  forgotPassword(): void {
    const email = this.loginForm.value.email;

    if (!email) {
      alert('Please enter your email to reset password.');
      return;
    }

    this.userService.forgotPassword(email).subscribe({
      next: () => {
        alert('The password has been sent to your email. Please check.');
      },
      error: () => {
        alert('Something went wrong while sending reset link.');
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // const sessionId = uuidv4(); // Optional if you want to use unique ID

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.saveUserData(res);
        this.isLoggedIn = true;
        console.log('Login Successful:', res);
        this.router.navigate(['/users/welcome']);
      },
      error: (err) => {
        this.errorMessage = 'Incorrect Email or Password';
        console.error('Login error:', err);
      }
    });
  }

  saveUserData(response: any): void {
    const token = response.body?.token;
    const refresh = response.body?.refresh_token;
    const user = response.body;

    localStorage.setItem('x-auth-token', token || '');
    localStorage.setItem('refresh-token', refresh || '');
    localStorage.setItem('user_data', JSON.stringify(user));
  }
}
