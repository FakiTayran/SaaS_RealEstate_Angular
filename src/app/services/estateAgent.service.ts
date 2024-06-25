import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

import { EstateAgent } from '../models/estateAgent.model';

@Injectable({
  providedIn: 'root'
})
export class EstateAgentService {

  private apiUrl = `${environment.apiUrl}/Account`; 
  private token = localStorage.getItem('access_token');


  constructor(private http: HttpClient) {}

  addEstateAgent(agent: { name: string; surname : string; email: string; estateCompanyId?: number }): Observable<any> {
    const estateCompanyId = parseInt(localStorage.getItem("company_id") ?? "0", 10);
    agent.estateCompanyId = estateCompanyId;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.apiUrl}/AddEstateAgent`, agent, { headers });
  }


  getEstateAgents(): Observable<EstateAgent[]> {
    var estateCompanyId = localStorage.getItem("company_id")
    console.log(estateCompanyId);
    return this.http.get<EstateAgent[]>(`${this.apiUrl}/GetAllAgents/${estateCompanyId}`);
  }

  deleteEstateAgent(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<any>(`${this.apiUrl}/DeleteEstateAgent/${id}`, { headers });
  }
}
