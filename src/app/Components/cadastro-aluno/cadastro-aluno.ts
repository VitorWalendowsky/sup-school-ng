import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importação correta do Router
import { FormsModule } from '@angular/forms';

interface Aluno {
  id: string;
  nome: string;
  nota1: number;
  nota2: number;
  nota3: number;
  frequencia: number;
  media: number;
  status: string;
}

@Component({
  selector: 'app-cadastro-aluno',
  imports: [FormsModule],
  templateUrl: './cadastro-aluno.html',
  styleUrls: ['./cadastro-aluno.scss'], // Corrigido de styleUrl para styleUrls
})
export class CadastroAluno {
  alunos: Aluno[] = []; // Inicializando o array
  nome: string = '';
  nota1?: number;
  nota2?: number;
  nota3?: number;
  frequencia?: number;

  constructor(private router: Router) {
    this.alunos = this.carregarAlunosLocalStorage();
  }

  // Métodos

  salvar(): void {
    if (this.nome && this.nota1 !== undefined && this.nota2 !== undefined && this.nota3 !== undefined && this.frequencia !== undefined) {
      // Variáveis locais
      let media = this.calcularMedia();
      let status = this.descobrirStatus(media);

      let aluno: Aluno = {
        id: crypto.randomUUID(),
        nome: this.nome,
        nota1: this.nota1,
        nota2: this.nota2,
        nota3: this.nota3,
        frequencia: this.frequencia,
        media: media,
        status: status,
      };

      this.alunos.push(aluno);

      this.salvarLocalStorage();
      this.router.navigate(['/alunos']);
    } else {
      console.error('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  salvarLocalStorage(): void {
    let alunosString = JSON.stringify(this.alunos);
    localStorage.setItem('alunos', alunosString);
  }

  carregarAlunosLocalStorage(): Aluno[] {
    let alunosDoLocalStorage = localStorage.getItem('alunos');
    if (alunosDoLocalStorage === null) {
      return [];
    }
    let alunos: Aluno[] = JSON.parse(alunosDoLocalStorage);
    return alunos;
  }

  calcularMedia(): number {
    // Garantir que todas as notas são válidas antes de calcular
    if (this.nota1 !== undefined && this.nota2 !== undefined && this.nota3 !== undefined) {
      return (this.nota1 + this.nota2 + this.nota3) / 3;
    }
    return 0; // Caso alguma nota não esteja definida, retornar 0
  }

  descobrirStatus(media: number): string {
    if (media >= 7 && this.frequencia! >= 75) {
      return 'Aprovado';
    } else if (media < 7) {
      return 'Reprovado Média';
    } else {
      return 'Reprovado Frequência';
    }
  }
}
