import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FediverseState } from '../model/fediverse-state';
import { FediverseHistory } from '../model/fediverse-history';
import { Simulation } from '../model/simulation';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private apiUrl = 'http://localhost:30001/api/simulations';

  constructor(private http: HttpClient) {}

  createSimulation(simulation: Simulation): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/create`, simulation, {headers: headers});
  }

  getSimulation(id: string): Observable<FediverseHistory> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<FediverseHistory>(`${this.apiUrl}/${id}`, {headers: headers});
  }

  startSimulation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/start/${id}`);
  }
}
