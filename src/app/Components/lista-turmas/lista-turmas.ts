import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

interface Turma {
  id: string;
  nome: string;
  sigla: string;
}

@Component({
  selector: 'app-lista-turmas',
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-turmas.html',
  styleUrl: './lista-turmas.scss'
})
export class ListaTurmas {
 turma: Turma[];

  constructor(){
    this.turma = this.carregarTurmaLocalStorage();
  }

  carregarTurmaLocalStorage(): Turma[] {
    let turmaDoLocalStorage = localStorage.getItem('turma');
    if(turmaDoLocalStorage === null){
      return [];
    }
    let turma: Turma[] = JSON.parse(turmaDoLocalStorage);
    return turma;
  }
}
