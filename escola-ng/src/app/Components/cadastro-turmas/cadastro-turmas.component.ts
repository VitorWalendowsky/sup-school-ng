import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Turma {
  id: string,
  nome: string,
  sigla: string
}

@Component({
  selector: 'app-cadastro-turmas',
  imports: [FormsModule],
  templateUrl: './cadastro-turmas.component.html',
  styleUrl: './cadastro-turmas.component.scss'
})

export class CadastroTurmasComponent {
  turmas: Turma[];

  nome: string = "";

  sigla: string = "";

  idEditarTurma?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.turmas = this.carregarTurmasLocalStorage();
    let idParaEditarTurma = this.activatedRoute.snapshot.paramMap.get("id");

    if (idParaEditarTurma !== null) {
      this.idEditarTurma = idParaEditarTurma.toString();

      this.preencherCamposParaEditar();
    }
  };

  preencherCamposParaEditar(): void {
    let turma = this.turmas.filter(turma => turma.id === this.idEditarTurma)[0];

    this.nome = turma.nome;

    this.sigla = turma.sigla;
  }

  salvarTurma(): void {
    if (this.idEditarTurma === undefined) {
      this.cadastrarTurma();
    } else {
      this.editarTurma();
    }

    this.salvarTurmaLocalStorage();

    this.router.navigate(["/turmas"]);
  };


  cadastrarTurma(): void {
    if (this.nome === "" && this.sigla === "") {
      alert("Por favor preencha os campos necessários.");
    } else if (this.sigla === "") {
      alert("Por favor preencha o campo com a sigla da turma.");
    } else if (this.nome === "") {
      alert("Por favor preencha o campo com o nome da turma.");
    } else {
      let turma: Turma = {
        id: crypto.randomUUID(),
        nome: this.nome!,
        sigla: this.sigla!
      };

      this.turmas.push(turma);
    }
  }

  editarTurma(): void {
    let indiceListaTurma = this.turmas.findIndex(turma => turma.id === this.idEditarTurma);

    this.turmas[indiceListaTurma].nome = this.nome;

    this.turmas[indiceListaTurma].sigla = this.sigla
  }

  salvarTurmaLocalStorage(): void {
    let turmaString = JSON.stringify(this.turmas);

    localStorage.setItem("turmas", turmaString);
  };

  carregarTurmasLocalStorage(): Turma[] {
    let turmasLocalStorage = localStorage.getItem("turmas");

    if (turmasLocalStorage === null) {
      return [];
    };

    let turmas: Turma[] = JSON.parse(turmasLocalStorage);
    return turmas;
  };
};
