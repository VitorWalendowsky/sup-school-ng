import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Turma {
  id: string,
  nome: string,
  sigla: string
}

@Component({
  selector: 'app-lista-turmas',
  imports: [RouterLink],
  templateUrl: './lista-turmas.component.html',
  styleUrl: './lista-turmas.component.scss'
})

export class ListaTurmasComponent {
  turmas: Turma[];

  constructor(private router: Router) {
    this.turmas = this.carregarTurmasLocalStorage();
  };

  carregarTurmasLocalStorage(): Turma[] {
    let turmasLocalStorage = localStorage.getItem("turmas");

    if (turmasLocalStorage === null) {
      return [];
    }

    let turmas: Turma[] = JSON.parse(turmasLocalStorage);
    return turmas;
  };

  apagarTurma(turma: Turma): void {
    let indexDaTurma =  this.turmas.indexOf(turma);

    this.turmas.splice(indexDaTurma, 1);

    this.salvarTurmaLocalStorage();
  };

  salvarTurmaLocalStorage(): void {
    let turmasSting = JSON.stringify(this.turmas);

    localStorage.setItem("turmas", turmasSting);
  };

  editarTurma(turma: Turma): void {
    this.router.navigate([`turmas/editar/${turma.id}`])
  }
}
