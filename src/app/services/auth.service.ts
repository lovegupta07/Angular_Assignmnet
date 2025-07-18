import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';  // Importing uuid library

@Injectable({    //means isko kisi v component me use kr skte h
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const url = `${environment.SERVER_URL}/user/login`;
    const clientId = this.generateUUID();
    // const credentials = btoa(username + ':' + password);

    const headers = new HttpHeaders({
      // 'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });

    const body = { 
      "email" : username,
      "password" : password,
      "client_id": clientId 
    };
    

    return this.http.post<any>(url, body, { headers : headers, observe: 'response' });
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('x-auth-token');
  }

  private generateUUID(): string {
    return uuidv4();
  }


}
