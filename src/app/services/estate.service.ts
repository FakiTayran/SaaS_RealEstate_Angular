import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

import { Estate } from '../models/estate.model';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  private apiUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

  saveEstate(estate: Estate): Observable<any> {
    return this.http.post<any>(this.apiUrl + "AddEstate", estate);
  }
}
