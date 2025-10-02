import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navibar } from './components/navibar/navibar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navibar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('biblioteca-ng');
}
