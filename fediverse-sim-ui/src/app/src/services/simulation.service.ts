import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FediverseState } from '../model/fediverse-state';
import { Server } from '../model/server';

interface FediverseHistory {
  // Add properties from your FediverseHistory model
}

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private apiUrl = 'http://localhost:30001/api/simulations';

  constructor(private http: HttpClient) {}

  getSimulation(id: string): Observable<FediverseHistory> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<FediverseHistory>(`${this.apiUrl}/${id}`, {headers: headers});
  }

  startSimulation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/start/${id}`);
  }

  createSimulation(): Observable<any> {
    const fediverseState: FediverseState = new FediverseState(2024, [
      new Server("lemmy", 3000),
      new Server("mastodon", 1000000)
    ]);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/create`, fediverseState, {headers: headers});
  }
}
