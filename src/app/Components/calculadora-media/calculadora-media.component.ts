import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-calculadora-media',
  imports: [FormsModule],
  templateUrl: './calculadora-media.component.html',
  styleUrl: './calculadora-media.component.scss'
})
export class CalculadoraMediaComponent {
  nota1?: number;

  nota2?: number;

  nota3?: number;

  media?: number;

  mensagem: string = "";

  calcular(): void {
    this.media = (this.nota1! + this.nota2! + this.nota3!) / 3;

    if (this.media >= 7) {
      let mensagemFinal = "O aluno está aprovado!"
      this.mensagem = mensagemFinal;
    } else if (this.media < 7) {
      let mensagemFinal = "O aluno está reprovado!"
      this.mensagem = mensagemFinal;
    }
  }
}
