import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estate } from '../models/estate.model';

@Injectable({
  providedIn: 'root'
})
export class EstateService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAllEstates(filters: any): Observable<Estate[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<Estate[]>(`${this.apiUrl}/GetEstates`, { headers, params });
  }

  saveEstate(estate: Estate): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const estateCompanyId = localStorage.getItem('company_id');
    if (estateCompanyId) {
      estate.realEstateCompanyId = parseInt(estateCompanyId, 10);
    }
    return this.http.post<any>(`${this.apiUrl}/AddEstate`, estate, { headers });
  }

  editEstate(estate: Estate): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const estateCompanyId = localStorage.getItem('company_id');
    if (estateCompanyId) {
      estate.realEstateCompanyId = parseInt(estateCompanyId, 10);
    }
    return this.http.put<any>(`${this.apiUrl}/EditEstate`, estate, { headers });
  }

  deleteEstate(estateId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/DeleteEstate/${estateId}`, { headers });
  }

  getEstateDetail(estateId: number): Observable<Estate> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Estate>(`${this.apiUrl}/GetEstateDetail/${estateId}`, { headers });
  }

  addEstatePhotos(estateId: number, photos: FileList): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    Array.from(photos).forEach(file => formData.append('imgs', file));
    return this.http.post<any>(`${this.apiUrl}/AddEstatePhotos/${estateId}`, formData, { headers });
  }
}
