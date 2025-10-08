import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutorCadastroRequest } from '../../../models/autor.dto';
import { AutorService } from '../../../services/autor.service';
import { Router } from '@angular/router';

interface Nacionalidade {
  nome: string;
}

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
  ],
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
    this.autorService.create(this.form).subscribe({
      next: _ => this.router.navigate(["/autores"]),
      error: erro => {
        alert("Não foi possível cadastrar a autor");
        console.error(erro);
      }
    })
  }
}
