import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

import { EstateAgent } from '../models/estateAgent.model';

@Injectable({
  providedIn: 'root'
})
export class EstateAgentService {

  private apiUrl = `${environment.apiUrl}/Account/`; 

  constructor(private http: HttpClient) {}

  saveEstateAgents(estateAgent: EstateAgent): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Register", estateAgent);
  }

  getEstateAgents(estateCompanyId: number): Observable<EstateAgent[]> {
    return this.http.get<EstateAgent[]>(this.apiUrl + "GetAllAgents/" + estateCompanyId);
  }}
