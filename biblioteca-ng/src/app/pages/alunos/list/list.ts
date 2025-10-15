import { Component } from '@angular/core';
import { AlunoResponse } from '../../../models/aluno.dtos';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-list',
  imports: [TableModule, CommonModule, RouterLink, ButtonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class AlunoList {
  alunos: AlunoResponse[] = [];

  constructor(private alunoService: AlunoService) {

  }

  ngOnInit() {
    this.carregarAlunos();
  }

  private carregarAlunos() {
    this.alunoService.getAll().subscribe({
      next: alunos => this.alunos = alunos,
      error: erro => {
        alert("Não foi possível carregar os alunos.");
        console.error("Ocorreu um erro ao carregar a lista de alunos: " + erro);
      }
    })
  }

  apagarAluno(id: number) {
    this.alunoService.delete(id).subscribe({
      next: sucesso => this.carregarAlunos(),
      error: erro => {
        alert("Não foi possível apagar os dados deste aluno");
        console.error("Ocorreu um erro ao tentar apagar o aluno: " + erro);
      }
    })
  }
}
