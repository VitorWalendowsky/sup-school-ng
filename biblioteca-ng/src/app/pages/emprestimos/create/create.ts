import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { LivroService } from '../../../services/livro.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EmprestimoCadastrarRequest } from '../../../models/emprestimo.dtos';
import { LivroResponse } from '../../../models/livro.dtos';
import { UsuarioResponse } from '../../../models/usuario.dtos';
import { ButtonModule } from 'primeng/button';
import { EmprestimosService } from '../../../services/emprestimos.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    CommonModule,
    SelectModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class EmprestimoCreate {
  form: EmprestimoCadastrarRequest;

  livros: LivroResponse[] = [];

  usuarios: UsuarioResponse[] = [];

  constructor(
    private livroService: LivroService,
    private usuarioService: UsuarioService,
    private emprestimoService: EmprestimosService,
    private router: Router,
  ) {
    this.form = {
      livroId: null,
      usuarioId: null,
      dataEmprestimo: null,
      dataDevolucao: null,
      status: ""
    }
  }

  ngOnInit() {
    this.carregarLivros();

    this.carregarUsuarios();
  }

  private carregarLivros() {
    this.livroService.getAll().subscribe({
      next: livros => {
        const livrosOdernados = livros.sort((a, b) => a.titulo.localeCompare(b.titulo));
        this.livros = livrosOdernados;
      },
      error: erro => {
        alert("Ocorreu um erro ao tentar carregar a lista de livros.");
        console.error("Ocorreu um erro ao tentar carregar a lista de livros: " + erro);
      }
    })
  }

  private carregarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: usuarios => {
        const usuariosOdernados = usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
        this.usuarios = usuariosOdernados;
      },
      error: erro => {
        alert("Ocorreu um erro ao tentar carregar a lista de usuários.");
        console.error("Ocorreu um erro ao tentar carregar a lista de usuarios: " + erro);
      }
    })
  }

  salvar() {
    this.emprestimoService.create(this.form).subscribe({
      next: sucesso => this.router.navigate(["/emprestimos"]),
      error: erro => {
        alert("Ocorreu um erro ao salvar os dados do empréstimo.");
        console.log("Ocorreu um erro ao salvar os dados do empréstimo: " + erro)
      }
    })
   }
}
