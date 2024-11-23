import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';

interface FediverseState {
  year: number;
  servers: Array<{
    id: string;
    name: string;
    usersPerMonth: number;
  }>;
}

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  allStates: FediverseState[] = [];
  selectedSimulationId?: string;

  constructor(private simulationService: SimulationService) {}

  ngOnInit() {
    // Fetch initial data (you might want to implement this based on your backend)
  }

  createSimulation() {
    this.simulationService.createSimulation().subscribe(
      (response: any) => this.selectedSimulationId = response["id"],
      (error: any) => console.error('Error starting simulation:', error)
    );
  }

  startSimulation() {
    if (this.selectedSimulationId) {
      this.simulationService.startSimulation(this.selectedSimulationId).subscribe(
        (response: any) => console.log('Simulation started successfully'),
        (error: any) => console.error('Error starting simulation:', error)
      );
    } else {
      console.error("Simulation id is not set. No simulation created");
    }
  }

  getSimulation() {
    if (this.selectedSimulationId) {
      this.simulationService.getSimulation(this.selectedSimulationId).subscribe(
        (response: any) => console.log('Received simulation data: ' + JSON.stringify(response["simulation"])),
        (error: any) => console.error('Error starting simulation:', error)
      );
    } else {
      console.error("Simulation id not set. No simulation created");
    }
  }
}
