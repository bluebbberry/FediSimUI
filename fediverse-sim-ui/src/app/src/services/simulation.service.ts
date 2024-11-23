import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const body = {
      "servers": [
          {
              "name": "lemmy",
              "usersPerMonth": 3000
          }
      ],
      "year": 1000
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/create`, body, {headers: headers});
  }
}
