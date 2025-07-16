import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url = `${environment.SERVER_URL}/user/query`;

    return this.http.post<any>(url, {}, this.getHeaders());
  }


  searchUsers(searchText: string = '', sortField: string = 'name', sortOrder: string = 'ASC'): Observable<any> {

    const url = `${environment.SERVER_URL}/user/query`;
    const body: any = {
      pagination_details: {}
    };

    if (searchText) {
      body.search_params = {
        search_text: searchText,
        search_columns: ["name", "email"]
      };
    }

    return this.http.post<any>(url, body, this.getHeaders());
  }


  inviteUser(name: string, email: string, role: string): Observable<any> {
    const url = `${environment.SERVER_URL}/organisation/6867d4a4eae17400268e9c55/user`;
    console.log({ name, email, role });
    return this.http.post<any>(url, { name, email, role }, this.getHeaders());
  }


  updateUserProfile(Name: string, mobileNo: number): Observable<any> {
    const body = {
      "name": Name,
    }
    const url = `${environment.SERVER_URL}/user/profile`;
    return this.http.put<any>(url, body, this.getHeaders());
  }


  // Update Paticular User
  updateUser(userId: string, payload: any) {
    return this.http.patch(`${environment.SERVER_URL}/user/${userId}`, payload, this.getHeaders());
  }


  deleteUser(userId: string): Observable<any> {
    console.log('User id is ', userId);
    const url = `${environment.SERVER_URL}/user/${userId}`;
    return this.http.delete<any>(url, this.getHeaders());
  }


  getUserImage(userId: string): Observable<any> {
    const url = `${environment.SERVER_URL}/user/profileimage/query`;
    return this.http.post(url, { user_id: [userId] }, this.getHeaders());
  }


  forgotPassword(email: string) {
    const url = `${environment.SERVER_URL}/user/forgotpassword`;
    return this.http.post(url, { email, "forgot_2fa": false }, this.getHeaders());
  }


  changePassword(newpassword: string, oldpassword: string) {
    const url = `${environment.SERVER_URL}/user/changepassword`;
    return this.http.post(url, { newpassword, oldpassword }, this.getHeaders());
  }


  // Headers: For API authentication (Authorization)
  private getHeaders() {
    const token = localStorage.getItem('x-auth-token') || '';

    const headers = new HttpHeaders({
      'Authorization': token || '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return { headers };
  }
}