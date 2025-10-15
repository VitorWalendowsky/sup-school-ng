import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutorEditarRequest } from '../../../models/autor.dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from '../../../services/autor.service';
import { DatePicker } from 'primeng/datepicker';

interface Nacionalidade {
  nome: string;
}

@Component({
  selector: 'app-edit',
  imports: [FormsModule, ButtonModule, SelectModule, InputTextModule, DatePicker],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class AutorEdit {
  form: AutorEditarRequest;

  id: number;

  nacionalidades: Nacionalidade[] = [
    { nome: "Argentino" },
    { nome: "Boliviano" },
    { nome: "Brasileiro" },
    { nome: "Chileno" },
    { nome: "Colombiano" },
    { nome: "Equatoriano" },
    { nome: "Guyanês" },
    { nome: "Paraguaio" },
    { nome: "Peruano" },
    { nome: "Surinamês" },
    { nome: "Uruguaio" },
    { nome: "Venezuelano" }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private autorService: AutorService,
    private router: Router,
  ) {
    this.form = {
      nome: "",
      nacionalidade: "",
      dataNascimento: ""
    }

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    this.carregarAutor();
  }

  private carregarAutor() {
    this.autorService.getById(this.id).subscribe({
      next: autor => {
        this.form.nome = autor.nome;
        this.form.nacionalidade = autor.nacionalidade;
        this.form.dataNascimento = new Date(autor.dataNascimento).toLocaleDateString('pt-BR');
      },
      error: erro => {
        alert("Não foi possível carregar o autor.");
        console.error("Ocorreu um erro ao tentar carregar o autor: " + erro);
      }
    })
  }
  salvar() {
    this.autorService.update(this.id, this.form).subscribe({
      next: sucesso => {
        this.router.navigate(["/autores"]);
      },
      error: erro => {
        alert("Não foi possível editar o autor.");
        console.error("Ocorreu um erro ao tentar atualizar o autor: " + erro);
      }
    })
  }
}
