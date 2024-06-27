import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // 'of' fonksiyonunu buradan import edin
import { map, catchError } from 'rxjs/operators'; // 'map' ve 'catchError' operatörlerini import edin
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  isAuthorized(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(false); 
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/Account/IsAuthorize`, { headers, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response.status === 200;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const loginDto = { email, password };
    return this.http.post<any>(`${this.apiUrl}/Account/Login`, loginDto);
  }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Account/Register`, JSON.stringify(data), { headers });
  }

}
