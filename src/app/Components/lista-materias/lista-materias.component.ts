import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Materia {
  id: string,
  nome: string
};

@Component({
  selector: 'app-lista-materias',
  imports: [RouterLink],
  templateUrl: './lista-materias.component.html',
  styleUrl: './lista-materias.component.scss'
})
export class ListaMateriasComponent {
  materias: Materia[];

  constructor(private router: Router) {
    this.materias = this.carregarMateriasLocalStorage();
  };

  salvarTurmaLocalStorage(): void {
    let materiasString = JSON.stringify(this.materias);

    localStorage.setItem("materias", materiasString);
  };

  carregarMateriasLocalStorage(): Materia[] {
    let materiasLocalStorage = localStorage.getItem("materias");

    if (materiasLocalStorage === null) {
      return [];
    };

    let materias: Materia[] = JSON.parse(materiasLocalStorage);
    return materias;
  };

  apagarMateria(materia: Materia): void {
    let indiceMateriaParaApagar = this.materias.indexOf(materia);

    this.materias.splice(indiceMateriaParaApagar, 1);
    
    this.salvarTurmaLocalStorage();
  }

  editarMateria(materia: Materia): void {
    this.router.navigate([`materias/editar/${materia.id}`])
  }
}
