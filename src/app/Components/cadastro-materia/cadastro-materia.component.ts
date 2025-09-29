import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Materia {
  id: string,
  nome: string
};

@Component({
  selector: 'app-cadastro-materia',
  imports: [FormsModule],
  templateUrl: './cadastro-materia.component.html',
  styleUrl: './cadastro-materia.component.scss'
})

export class CadastroMateriaComponent {
  materias: Materia[];

  materia: string = "";

  idEditarMateria? : string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.materias = this.carregarMateriasLocalStorage();

    let idParaEditarMateria = this.activatedRoute.snapshot.paramMap.get("id");

    if (idParaEditarMateria !== null) {
      this.idEditarMateria = idParaEditarMateria.toString();

      this.preencherCamposParaEditarMateria();
    }
  }

  preencherCamposParaEditarMateria(): void {
    let materia = this.materias.filter(materia => materia.id === this.idEditarMateria)[0];

    this.materia = materia.nome;
  };

  salvarMateria(): void {
    if (this.idEditarMateria === undefined) {
      this.cadastrarMateria();
    } else {
      this.editarMateria();
    }

    this.salvarMateriaLocalStorage();

    this.router.navigate(["/materias"])
  }

  cadastrarMateria(): void {
    if (this.materia === "") {
      alert("Por favor preencha o nome da matéria.");
    } else {
      let materia: Materia = {
        id: crypto.randomUUID(),
        nome: this.materia
      }

      this.materias.push(materia);
    }
  }

  editarMateria(): void {
    let indiceListaMateria = this.materias.findIndex(materia => materia.id === this.idEditarMateria);

    this.materias[indiceListaMateria].nome = this.materia;
  }

  salvarMateriaLocalStorage(): void {
    let materiasString = JSON.stringify(this.materias);

    localStorage.setItem("materias", materiasString);
  };

  carregarMateriasLocalStorage(): Materia[] {
    let materiasLocalStorage = localStorage.getItem("materias");

    if (materiasLocalStorage === null) {
      return [];
    }

    let materias: Materia[] = JSON.parse(materiasLocalStorage);
    return materias;
  }
}
