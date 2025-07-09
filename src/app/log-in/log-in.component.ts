import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  get emailInvalid(): boolean {
    return this.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  get passwordInvalid(): boolean {
    return this.password !== '' && this.password.trim() === '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.errorMessage = '';

    if (!this.emailInvalid && !this.passwordInvalid) {
      const clientId = uuidv4();
      this.authService.login(this.email, this.password, clientId).subscribe({
        next: () => {
          
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Login failed';
        }
      });
    }
  }
}
