
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(search: string, pageSize: number, page: number, sortField: string, sortOrder: string): Observable<any> {
  const params = {
    search,
    pageSize: pageSize.toString(),
    page: page.toString(),
    sortField,
    sortOrder
  };
  return this.http.get(`${this.baseUrl}/users`, { params });
}


  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }

  uploadProfileImage(userId: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/upload`, formData);
  }
}
