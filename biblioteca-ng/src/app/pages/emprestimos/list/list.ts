import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EmprestimoResponse } from '../../../models/emprestimo.dtos';
import { EmprestimosService } from '../../../services/emprestimos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class EmprestimoList {
 emprestimos: EmprestimoResponse[] = [];

 constructor(
  private emprestimosService: EmprestimosService,
 ) { };

 ngOnInit() {
  this.carregarEmprestimos();
 }

 private carregarEmprestimos() {
  this.emprestimosService.getAll().subscribe({
    next: empretimos => this.emprestimos = empretimos,
    error: erro => {
      alert("Não foi possivel carregar os empréstimos cadastrados.");
      console.error("Ocorreu um erro ao tentar carregar os empréstimos cadastrados: " + erro);
    }
  })
 }
}
