import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const BASE_URL = 'https://dev1api.pronnel.com/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string, clientId: string): Observable<any> {
    const headers = new HttpHeaders({
      // 'Authorization': 'Basic ' + btoa(`${email}:${password}`)
      'Content-Type': 'application/json'
    });

    const body = {"email": email, "password": password, "client_id": clientId };

    return this.http.post(`${BASE_URL}/api/user/sessions`, body, {
      headers,
      observe: 'response'
    }).pipe(
      tap((response) => {
        const token = response.headers.get('x-auth-token');
        const refreshToken = response.headers.get('refresh-token');
        const user = response.body;

        // Save data to local storage
        localStorage.setItem('x-auth-token', token || '');
        localStorage.setItem('refresh-token', refreshToken || '');
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('x-auth-token');
  }

  logout(): void {
    localStorage.clear();
  }
}
