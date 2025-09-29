import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora-temperatura',
  imports: [FormsModule],
  templateUrl: './calculadora-temperatura.component.html',
  styleUrl: './calculadora-temperatura.component.scss'
})
export class CalculadoraTemperaturaComponent {
  valor?: number;

  resultado?: number;

  converterKelvinParaFahrenheit(): void {
    this.resultado = (this.valor! - 273.15) * 9/5 + 32;
  }

  converterFahrenheitParaKelvin(): void {
    this.resultado = (this.valor! - 32) * 5/9 + 273.15;
  }

  converterKelvinParaCelsius(): void {
    this.resultado = this.valor! - 273.15;
  }

  converterCelsiusParaKelvin(): void {
    this.resultado = this.valor! + 273.15;
  }

  converterFahrenheitParaCelsius(): void {
    this.resultado = (this.valor! - 32) * 5/9;
  }

  converterCelsiusParaFahrenheit(): void {
    this.resultado = (this.valor! * 9/5) + 32;
  }
}
