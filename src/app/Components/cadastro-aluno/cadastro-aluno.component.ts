import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss'
})

export class CadastroAlunoComponent {
  // Propriedades
  alunos: Aluno[];

  nome: string = "";

  nota1?: number;

  nota2?: number;

  nota3?: number;

  frequencia?: number;

  idEditar?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.alunos = this.carregarAlunosLocalStorage();
    let idParaEditar = this.activatedRoute.snapshot.paramMap.get("id");
    // Se o idParaEditar for diferente de null, quer dizer que o id está definido na URL
    if (idParaEditar !== null) {
      this.idEditar = idParaEditar.toString();

      this.preencherCamposParaEditar();
    };
  };

  preencherCamposParaEditar(): void {
    let aluno = this.alunos.filter(aluno => aluno.id === this.idEditar)[0];

    this.nome = aluno.nome;

    this.nota1 = aluno.nota1;

    this.nota2 = aluno.nota2;

    this.nota3 = aluno.nota3;

    this.frequencia = aluno.frequencia;
  }

  // Métodos
  salvar(): void {
    // Variável local
    let media = this.calcularMedia();

    let status = this.descobrirStatus(media);

    if (this.idEditar === undefined) {
      this.cadastrarAluno(media, status);
    } else {
      this.editarAluno(media, status);
    };

    this.salvarLocalStorage();

    this.router.navigate(["/alunos"]);
  };

  editarAluno(media: number, status: string): void {
    let indiceLista = this.alunos.findIndex(aluno => aluno.id === this.idEditar);

    this.alunos[indiceLista].nome = this.nome;

    this.alunos[indiceLista].nota1 = this.nota1!;

    this.alunos[indiceLista].nota2 = this.nota2!;

    this.alunos[indiceLista].nota3 = this.nota3!;

    this.alunos[indiceLista].media = media;

    this.alunos[indiceLista].frequencia = this.frequencia!;

    this.alunos[indiceLista].status = status;
  }

  cadastrarAluno(media: number, status: string): void {
    let aluno: Aluno = {
      id: crypto.randomUUID(),
      nome: this.nome,
      nota1: this.nota1!,
      nota2: this.nota2!,
      nota3: this.nota3!,
      frequencia: this.frequencia!,
      media: media,
      status: status,
    };

    this.alunos.push(aluno);
  }

  salvarLocalStorage(): void {
    let alunosString = JSON.stringify(this.alunos);

    localStorage.setItem("alunos", alunosString);
  }

  carregarAlunosLocalStorage(): Aluno[] {
    let alunosDoLocalStorage = localStorage.getItem("alunos");

    if (alunosDoLocalStorage === null) {
      return [];
    };

    let alunos: Aluno[] = JSON.parse(alunosDoLocalStorage);
    return alunos;
  }

  calcularMedia(): number {
    let resultado: number = (this.nota1! + this.nota2! + this.nota3!) / 3;

    return resultado;
  };

  descobrirStatus(media: number): string {
    let status = "";

    if (media >= 7 && this.frequencia! >= 75) {
      status = "Aprovado"
    } else if (media < 7) {
      status = "Reprovado Média";
    } else {
      status = "Reprovado Frequência";
    }

    return status;
  }
};
