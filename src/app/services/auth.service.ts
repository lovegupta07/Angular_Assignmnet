import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const clientId = uuidv4();
    localStorage.setItem('client_id', clientId);
    const headers = new HttpHeaders({
      // 'Authorization': 'Basic ' + btoa(`${email}:${password}`)
      'Content-Type': 'application/json'
    });

    const body = {
    email: email,
    password: password,
    client_id: clientId
    };

    return this.http.post(`${this.baseUrl}/user/login`, body, {
      headers,
      observe: 'response'
    }).pipe(
      tap((response: any) => {
        // console.log('Login API response:', response); // 

        const token = response.body?.token;
        const refreshToken = response.body?.refresh_token;
        const user = response.body;

        // Save data to local storage
        localStorage.setItem('x-auth-token', token);
        localStorage.setItem('refresh-token', refreshToken || '');
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('x-auth-token');
  }

  logoutFromServer(): void {
    const token = localStorage.getItem('x-auth-token') || '';
    const client_id = localStorage.getItem('client_id') || '';

    if (!client_id) {
      console.warn('Client ID not found for logout');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });

    const body = { client_id };

    this.http.post(`${this.baseUrl}/user/logout`, body, { headers }).subscribe({
      next: () => {
        console.log('Successfully logged out from server');
        this.logout();
      },
      error: (err) => {
        console.error('Logout failed, proceeding with client logout:', err);
        this.logout();
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
