import { Component } from '@angular/core';
import { FormsModule, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-calculadora-retangulo',
  imports: [FormsModule],
  templateUrl: './calculadora-retangulo.component.html',
  styleUrl: './calculadora-retangulo.component.scss'
})
export class CalculadoraRetanguloComponent {
  base?: number;

  altura?: number;

  area?: number;

  calcular():void {
    this.area = this.base! * this.altura!;
  }
}
