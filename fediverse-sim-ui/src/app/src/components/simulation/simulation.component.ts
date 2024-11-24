import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
import { FediverseState } from '../../model/fediverse-state';
import { Server } from '../../model/server';
import { FediverseHistory } from '../../model/fediverse-history';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  selectedSimulationId?: string;
  fediverseHistoryResult?: FediverseHistory;
  fediverseState: FediverseState;

  constructor(private simulationService: SimulationService) {
    this.fediverseState = new FediverseState();
  }

  ngOnInit() {
    // Fetch initial data (you might want to implement this based on your backend)
  }
  
  addServer() {
    this.fediverseState.servers!.push(new Server());
  }

  startSimulation() {
    this.simulationService.createSimulation(this.fediverseState).subscribe(
      (response: any) => {
        this.selectedSimulationId = response["id"];
        this.onCreatedSimulation();
      },
      (error: any) => console.error('Error starting simulation:', error)
    );
  }

  onCreatedSimulation() {
    this.simulationService.startSimulation(this.selectedSimulationId!).subscribe(
      (response: any) => console.log('Simulation started successfully'),
      (error: any) => console.error('Error starting simulation:', error)
    );
  }

  getSimulation() {
    if (this.selectedSimulationId) {
      this.simulationService.getSimulation(this.selectedSimulationId).subscribe(
        (response: FediverseHistory) => {
          console.log('Received simulation data: ' + JSON.stringify(response));
          this.fediverseHistoryResult = response;
        },
        (error: any) => console.error('Error starting simulation:', error)
      );
    } else {
      console.error("Simulation id not set. No simulation created");
    }
  }
}
