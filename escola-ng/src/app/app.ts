import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Calculadora } from "./Components/calculadora/calculadora";
import { Header } from "./Components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Calculadora, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sup-school-ng');
}


