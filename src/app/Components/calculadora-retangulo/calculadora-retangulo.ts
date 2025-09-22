import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora-retangulo',
  imports: [FormsModule],
  templateUrl: './calculadora-retangulo.html',
  styleUrl: './calculadora-retangulo.scss'
})
export class CalculadoraRetangulo {
base: number = 0;
altura: number = 0;
area: number = 0;

calcular(){
  this.area = this.base * this.altura;
}
}
