import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./cadastro-aluno.scss'],
  standalone: true // Se você estiver usando Angular standalone components
})
export class CadastroAluno {
  alunos: Aluno[] = [];

  nome: string = '';
  nota1?: number;
  nota2?: number;
  nota3?: number;
  frequencia?: number;

  idEditar?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.alunos = this.carregarAlunosLocalStorage();
    const idParaEditar = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParaEditar !== null) {
      this.idEditar = idParaEditar;
      this.preencherCamposParaEditar();
    }
  }

  preencherCamposParaEditar(): void {
    if (this.idEditar) {
      const aluno = this.alunos.find(a => a.id === this.idEditar);
      if (aluno) {
        this.nome = aluno.nome;
        this.nota1 = aluno.nota1;
        this.nota2 = aluno.nota2;
        this.nota3 = aluno.nota3;
        this.frequencia = aluno.frequencia;
      }
    }
  }

  salvar(): void {
    const media = this.calcularMedia();
    const status = this.descobrirStatus(media);

    if (this.idEditar === undefined) {
      this.cadastrarAluno(media, status);
    } else {
      this.editarAluno(media, status);
    }

    this.salvarLocalStorage();
    this.router.navigate(['/alunos']);
  }

  cadastrarAluno(media: number, status: string): void {
    const aluno: Aluno = {
      id: crypto.randomUUID(),
      nome: this.nome,
      nota1: this.nota1!,
      nota2: this.nota2!,
      nota3: this.nota3!,
      frequencia: this.frequencia!,
      media: media,
      status: status
    };
    this.alunos.push(aluno);
  }

  editarAluno(media: number, status: string): void {
    if (this.idEditar) {
      const index = this.alunos.findIndex(a => a.id === this.idEditar);
      if (index !== -1) {
        this.alunos[index] = {
          ...this.alunos[index],
          nome: this.nome,
          nota1: this.nota1!,
          nota2: this.nota2!,
          nota3: this.nota3!,
          frequencia: this.frequencia!,
          media: media,
          status: status
        };
      }
    }
  }

  salvarLocalStorage(): void {
    localStorage.setItem('alunos', JSON.stringify(this.alunos));
  }

  carregarAlunosLocalStorage(): Aluno[] {
    const dados = localStorage.getItem('alunos');
    return dados ? JSON.parse(dados) : [];
  }

  calcularMedia(): number {
    if (
      this.nota1 !== undefined &&
      this.nota2 !== undefined &&
      this.nota3 !== undefined
    ) {
      return (this.nota1 + this.nota2 + this.nota3) / 3;
    }
    return 0;
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
