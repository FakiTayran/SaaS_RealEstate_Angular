import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estate } from '../models/estate.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstateService {
  private apiUrl = `${environment.apiUrl}`;
  private token = localStorage.getItem('access_token');

  constructor(private http: HttpClient) {}

  getAllEstates(filters: any): Observable<Estate[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let params = new HttpParams();
    
    const realEstateCompanyId = localStorage.getItem('company_id'); // it must be send for individual private data.
    if (realEstateCompanyId) {
      filters['realEstateCompanyId'] = realEstateCompanyId;
    }

    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    
    return this.http.get<Estate[]>(`${this.apiUrl}/GetEstates`, { headers, params });
  }

  saveEstate(estate: Estate): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const estateCompanyId = localStorage.getItem('company_id');
    if (estateCompanyId) {
      estate.realEstateCompanyId = parseInt(estateCompanyId, 10);
    }
    return this.http.post<any>(`${this.apiUrl}/AddEstate`, estate, { headers });
  }

  editEstate(estate: Estate): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    const estateCompanyId = localStorage.getItem('company_id');
    if (estateCompanyId) {
      estate.realEstateCompanyId = parseInt(estateCompanyId, 10);
    }
    return this.http.put<any>(`${this.apiUrl}/EditEstate`, estate, { headers });
  }

  deleteEstate(estateId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<any>(`${this.apiUrl}/DeleteEstate/${estateId}`, { headers });
  }

  getEstateDetail(estateId: number): Observable<Estate> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Estate>(`${this.apiUrl}/GetEstateDetail/${estateId}`, { headers });
  }

  

  addEstatePhotos(estateId: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/AddEstatePhotos/${estateId}`, formData, { responseType: 'text' ,headers})
      .pipe(
        catchError(error => {
          console.error('Error occurred while uploading photos:', error);
          return throwError(error);
        })
      );
  }

  deleteEstatePhoto(photoId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(`${this.apiUrl}/DeleteEstatePhoto/${photoId}`,{headers});
  }
  
}
