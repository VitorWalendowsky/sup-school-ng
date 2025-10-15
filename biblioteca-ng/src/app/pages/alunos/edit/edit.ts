import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { AlunoEditarRequest } from '../../../models/aluno.dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../../services/aluno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [InputTextModule, DatePickerModule, ButtonModule, InputMaskModule,FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class AlunoEdit {
  form: AlunoEditarRequest;

  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router,
  ) {
    this.form = {
      nome: "",
      sobrenome: "",
      cpf: "",
      dataNascimento: "",
    }

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    this.carregarAluno();
  }
  private carregarAluno() {
    this.alunoService.getById(this.id).subscribe({
      next: aluno => {
        this.form.nome = aluno.nome;
        this.form.sobrenome = aluno.sobrenome;
        this.form.cpf = aluno.cpf;
        this.form.dataNascimento = new Date(aluno.dataNascimento).toLocaleDateString("pt-BR");
      },
      error: erro => {
        alert("Não foi possível carregar os dados deste aluno");
        console.error("Ocorreu um erro ao tentar carregar o aluno: " + erro);
      }
    })
  }

  salvarAluno() {
    this.alunoService.update(this.id, this.form).subscribe({
      next: sucesso => this.router.navigate(["/alunos"]),
      error: erro => {
        alert("Ocorreu um erro ao tentar atualizar o aluno.");
        console.error("Ocorreu um erro ao tentar atualizar o aluno: " + erro)
      }
    })
   }
}
