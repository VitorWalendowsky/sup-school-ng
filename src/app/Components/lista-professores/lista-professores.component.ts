import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Professor {
  id: string,
  nome: string,
  cpf: string,
  nascimento: Date,
  cnpj: string,
  pix: string,
  fantasia: string,
  valor: number,
  celular: string
};



@Component({
  selector: 'app-lista-professores',
  imports: [RouterLink],
  templateUrl: './lista-professores.component.html',
  styleUrl: './lista-professores.component.scss'
})
export class ListaProfessoresComponent {
  professores: Professor[];

  constructor(private router: Router) {
    this.professores = this.carregarProfessoresLocalStorage();
  }

  salvarProfessorLocalStorage(): void {
    let professoresString = JSON.stringify(this.professores);

    localStorage.setItem("professores", professoresString);
  };

  carregarProfessoresLocalStorage(): Professor[] {
    let professoresLocalStorage = localStorage.getItem("professores");

    if (professoresLocalStorage === null) {
      return [];
    }

    let professores: Professor[] = JSON.parse(professoresLocalStorage);
    return professores;
  };

  editarProfessor(professor: Professor): void {
    this.router.navigate([`professores/editar/${professor.id}`])
  }

  apagarProfessor(professor: Professor): void {
    let indiceParaApagarProfessor = this.professores.indexOf(professor);

    this.professores.splice(indiceParaApagarProfessor, 1);

    this.salvarProfessorLocalStorage();
  };

  gerarGeracaoProfessor(nascimento: Date): string {

    let ano = new Date(nascimento).getFullYear();

    let geracao: string = "";

    if (ano >= 1946 && ano <= 1964) {
      geracao = "Baby Boomer"
    } else if (ano >= 1965 && ano <= 1980) {
      geracao = "Geração X"
    } else if (ano >= 1981 && ano <= 1996) {
      geracao = "Millenial"
    } else if (ano >= 1997 && ano <= 2012) {
      geracao = "Geração Z"
    } else {
      geracao = "Geração Alfa"
    }

    return geracao;
  }
}

