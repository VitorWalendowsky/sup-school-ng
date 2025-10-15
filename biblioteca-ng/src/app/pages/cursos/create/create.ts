import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CursoCadastroRequest } from '../../../models/curso.dtos';
import { Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [InputTextModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class CursoCreate {
  form: CursoCadastroRequest;

  constructor(
    private router: Router,
    private cursoService: CursoService
  ) {
    this.form = {
      nome: "",
      sigla: ""
    }
  }

  salvar() {
    this.cursoService.create(this.form).subscribe({
      next: sucesso => this.router.navigate(["/cursos"]),
      error: erro => {
        alert("Não foi possível criar o curso");
        console.error("Ocorreu um erro ao tentar criar o curso: " + erro);
      }
    })
  }
}
