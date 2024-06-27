import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/Account`; 
    private token = localStorage.getItem('access_token');


  constructor(private http: HttpClient) {}

  updateProfile(data: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/updateProfile`, data,{headers});
  }

  changePassword(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.post(`${this.apiUrl}/changePassword`, data,{headers});
  }
}
