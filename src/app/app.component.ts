import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldmapComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'World Map';
}
