import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private apiUrl = `${environment.apiUrl}/Account`; 
    private token = localStorage.getItem('access_token');


  constructor(private http: HttpClient) {}

  updateCompanySettings(data: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/UpdateEstateCompany`, data,{headers});
  }
}
