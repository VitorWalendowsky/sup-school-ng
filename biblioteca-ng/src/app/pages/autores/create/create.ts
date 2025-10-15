import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutorCadastroRequest } from '../../../models/autor.dtos';
import { AutorService } from '../../../services/autor.service';
import { Router } from '@angular/router';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';

interface Nacionalidade {
  nome: string;
}

@Component({
  selector: 'app-create',
  imports: [FormsModule, ButtonModule, Select, InputTextModule, DatePicker],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class AutorCreate {
  form: AutorCadastroRequest;

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
    private autorService: AutorService,
    private router: Router,
  ) {
    this.form = {
      nome: "",
      nacionalidade: "",
      dataNascimento: ""
    }
  }

  salvar() {
    this.autorService.create(this.form).subscribe ({
      next: sucesso => this.router.navigate(["/autores"]),
      error: erro => {
        alert("Não foi possível cadastrar o autor");
        console.error("Ocorreu um erro ao cadastrar o autor: " + erro);
      }
    })
   }
}
