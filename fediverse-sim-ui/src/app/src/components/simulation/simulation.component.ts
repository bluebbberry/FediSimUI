import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
import { FediverseState } from '../../model/fediverse-state';
import { Server } from '../../model/server';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  selectedSimulationId?: string;
  resultTextarea?: string;
  fediverseState: FediverseState;

  constructor(private simulationService: SimulationService) {
    this.fediverseState = new FediverseState();
  }

  ngOnInit() {
    // Fetch initial data (you might want to implement this based on your backend)
  }

  createSimulation() {
    const fediverseState: FediverseState = new FediverseState(this.fediverseState.year, [
      new Server("lemmy", 3000),
      new Server("mastodon", 1000000)
    ]);
    this.simulationService.createSimulation(fediverseState).subscribe(
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
        (response: any) => {
          console.log('Received simulation data: ' + JSON.stringify(response["simulation"]));
          this.resultTextarea = JSON.stringify(response["simulation"]);
        },
        (error: any) => console.error('Error starting simulation:', error)
      );
    } else {
      console.error("Simulation id not set. No simulation created");
    }
  }
}
