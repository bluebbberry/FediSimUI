import { SimulationService } from '../../services/simulation.service';
import { FediverseState } from '../../model/fediverse-state';
import { Server } from '../../model/server';
import { FediverseHistory } from '../../model/fediverse-history';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Simulation } from '../../model/simulation';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf]
})
export class SimulationComponent implements OnInit {
  selectedSimulationId?: string;
  fediverseHistoryResult?: FediverseHistory;
  simulation: Simulation;
  startState: FediverseState;
  isLoadingSimulationResult: boolean = false;

  constructor(private simulationService: SimulationService) {
    this.simulation = new Simulation();
    this.startState = new FediverseState();
    this.simulation.startState = this.startState;
  }

  ngOnInit() {
    // Fetch initial data (you might want to implement this based on your backend)
  }
  
  addServer() {
    this.simulation.startState!.servers!.push(new Server());
  }

  startSimulation() {
    this.simulationService.createSimulation(this.simulation).subscribe(
      (response: any) => {
        this.isLoadingSimulationResult = true;
        this.selectedSimulationId = response["id"];
        this.onCreatedSimulation();
      },
      (error: any) => console.error('Error starting simulation:', error)
    );
  }

  onCreatedSimulation() {
    this.simulationService.startSimulation(this.selectedSimulationId!).subscribe(
      (response: any) => {
        console.log('Simulation started successfully');
        this.onStartedSimulation();
      },
      (error: any) => console.error('Error starting simulation:', error)
    );
  }

  onStartedSimulation() {
    const intervallId = setInterval(() => {
      this.getSimulation((response: FediverseHistory) => {
        this.fediverseHistoryResult = response;
        clearInterval(intervallId);
      });
    }, 2000);
  }

  getSimulation(onSuccess: any) {
    if (this.selectedSimulationId) {
      this.simulationService.getSimulation(this.selectedSimulationId).subscribe(
        (response: FediverseHistory) => {
          console.log('Received simulation data: ' + JSON.stringify(response));
          this.isLoadingSimulationResult = false;
          onSuccess(response);
        },
        (error: any) => console.error('Error starting simulation:', error)
      );
    } else {
      console.error("Simulation id not set. No simulation created");
    }
  }
}
