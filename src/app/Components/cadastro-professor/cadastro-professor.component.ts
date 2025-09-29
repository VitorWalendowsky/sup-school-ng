import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-cadastro-professor',
  imports: [FormsModule],
  templateUrl: './cadastro-professor.component.html',
  styleUrl: './cadastro-professor.component.scss'
})
export class CadastroProfessorComponent {
  professores: Professor[];

  nomeCompleto: string = "";

  cpf: string = "";

  dataNascimento?: Date;

  geracao: string = "";

  cnpj: string = "";

  chavePix: string = "";

  nomeFantasia: string = "";

  valorHora?: number;

  celular: string = "";

  idEditarProfessor?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.professores = this.carregarProfessoresLocalStorage();

    let idParaEditarProfessor = this.activatedRoute.snapshot.paramMap.get("id");

    if (idParaEditarProfessor !== null) {
      this.idEditarProfessor = idParaEditarProfessor.toString();

      this.preencherCamposParaEditarProfessor();
    }
  }

  preencherCamposParaEditarProfessor(): void {
    let professor = this.professores.filter(professor => professor.id === this.idEditarProfessor)[0];

    this.nomeCompleto = professor.nome;

    this.cpf = professor.cpf;

    this.dataNascimento = professor.nascimento;

    this.cnpj = professor.cnpj;

    this.chavePix = professor.pix;

    this.nomeFantasia = professor.fantasia;

    this.valorHora = professor.valor;

    this.celular = professor.celular;
  };

  salvarProfessor(): void {
    if (this.idEditarProfessor === undefined) {
      this.cadastrarProfessor();
    } else {
      this.editarProfessor();
    }

    this.salvarProfessorLocalStorage();

    this.router.navigate(["/professores"]);
  }

  cadastrarProfessor(): void {
    let professor: Professor = {
      id: crypto.randomUUID(),
      nome: this.nomeCompleto,
      cpf: this.cpf,
      nascimento: this.dataNascimento!,
      cnpj: this.cnpj,
      pix: this.chavePix,
      fantasia: this.nomeFantasia,
      valor: this.valorHora!,
      celular: this.celular!
    };

    this.professores.push(professor);
  };

  editarProfessor(): void {
    let indiceListaProfessor = this.professores.findIndex(professor => professor.id === this.idEditarProfessor);

    this.professores[indiceListaProfessor].nome = this.nomeCompleto;

    this.professores[indiceListaProfessor].cpf = this.cpf;

    this.professores[indiceListaProfessor].nascimento = this.dataNascimento!;

    this.professores[indiceListaProfessor].cnpj = this.cnpj;

    this.professores[indiceListaProfessor].pix = this.chavePix;

    this.professores[indiceListaProfessor].fantasia = this.nomeFantasia;

    this.professores[indiceListaProfessor].valor = this.valorHora!;

    this.professores[indiceListaProfessor].celular = this.celular;
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
}
