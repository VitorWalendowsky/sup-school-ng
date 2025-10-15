import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AlunoCadastroRequest } from '../../../models/aluno.dtos';
import { AlunoService } from '../../../services/aluno.service';
import { Router } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-create',
  imports: [FormsModule, ButtonModule, InputTextModule, InputMaskModule, DatePickerModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class AlunoCreate {
  form: AlunoCadastroRequest;

  constructor(
    private alunoService: AlunoService,
    private router: Router,
  ) {
    this.form = {
      nome: "",
      sobrenome: "",
      dataNascimento: "",
      cpf: ""
    }
  }

  salvarALuno() {
    this.alunoService.create(this.form).subscribe ({
      next: sucesso => this.router.navigate(["/alunos"]),
      error: erro => {
        alert("Não foi possível criar o aluno.");
        console.error("Ocorreu um erro ao tentar criar o aluno: " + erro);
      }
    })
  }
}
