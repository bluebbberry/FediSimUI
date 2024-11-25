import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimulationComponent } from './src/components/simulation/simulation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimulationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fedi-sim-2';
}
