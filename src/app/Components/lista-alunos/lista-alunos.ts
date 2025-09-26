import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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
  selector: 'app-lista-alunos',
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-alunos.html',
  styleUrl: './lista-alunos.scss'
})
export class ListaAlunosComponent {

  alunos: Aluno[];

  constructor(private router:Router) {
    this.alunos = this.carregarAlunosLocalStorage();
  }

  carregarAlunosLocalStorage(): Aluno[] {
    let alunosDoLocalStorage = localStorage.getItem('alunos');
    if(alunosDoLocalStorage === null){
      return [];
    }
    let alunos: Aluno[] = JSON.parse(alunosDoLocalStorage);
    return alunos;
  }
    apagar(aluno: Aluno): void {
      let indiceParaApagar = this.alunos.indexOf(aluno);
      this.alunos.splice(indiceParaApagar, 1);
      this.salvarLocalStorage();
    }

    editar(aluno: Aluno): void {
      this.router.navigate([`/alunos/editar`, aluno.id]);
    }

  salvarLocalStorage(): void {
    let alunosString = JSON.stringify(this.alunos);
    localStorage.setItem('alunos', alunosString);
  }
  
  }


