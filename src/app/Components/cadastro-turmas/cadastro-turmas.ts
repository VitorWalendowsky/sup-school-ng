import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

interface Turma {
  id: string;
  nome: string;
  sigla: string;
}

@Component({
  selector: 'app-cadastro-turmas',
  imports: [FormsModule],
  templateUrl: './cadastro-turmas.html',
  styleUrl: './cadastro-turmas.scss'
})

export class CadastroTurmas {
  turma: Turma[] = [];
  nome: string = '';
  sigla: string = '';
  aluno: any; // Declare the aluno property


constructor(private router: Router) {
  this.aluno = this.carregarTurmaLocalStorage();
}

salvar(): void {
  if (this.nome && this.sigla) {
    let turma: Turma = {
      id: crypto.randomUUID(),
      nome: this.nome,
      sigla: this.sigla,
    };

    this.turma.push(turma);

    this.salvarLocalStorage();
    this.router.navigate(['/turmas']);
  } else {
    console.error('Por favor, preencha todos os campos obrigatórios.');
  }
}
  salvarLocalStorage(): void {
    localStorage.setItem('turma', JSON.stringify(this.turma));
}

carregarTurmaLocalStorage(): Turma[] {
  let turmaDoLocalStorage = localStorage.getItem('turma');
  if (turmaDoLocalStorage === null) {
    return [];
  }
  let turma: Turma[] = JSON.parse(turmaDoLocalStorage);
  return turma;
}
}