import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-aluno',
  imports: [FormsModule],
  templateUrl: './cadastro-aluno.html',
  styleUrl: './cadastro-aluno.scss',
})
export class CadastroAluno {
  nome: string = '';
  nota1?: number;
  nota2?: number;
  nota3?: number;
  frequencia?: number;

  salvar(): void {
    let media: number = (this.nota1! + this.nota2! + this.nota3!) / 3;

    let status = '';
    if (media >= 7 && this.frequencia! >= 75) {
      status = 'Aprovado';
    } else if (media <= 7) {
      status = 'Reprovado Média';
    } else {
      status = 'Reprovado Frequência';
    }
  }
}
