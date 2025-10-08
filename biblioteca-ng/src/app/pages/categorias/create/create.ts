import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaCadastroRequest } from '../../../models/categoria.dto';
import { ButtonModule } from 'primeng/button';
import { CategoriaService } from '../../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  // Seletor para usar este formulário de criação no HTML.
  selector: 'app-create',
  // Módulos necessários (ngModel, p-inputText, p-button) para o template.
  imports: [FormsModule, InputTextModule, ButtonModule],
  // Template do formulário de cadastro.
  templateUrl: './create.html',
  // Estilos específicos deste componente.
  styleUrl: './create.scss'
})
export class CategoriaCreate {
  // Modelo do formulário tipado pelo DTO de cadastro.
  form: CategoriaCadastroRequest;

  // Injeção de dependências:
  // - categoriaService: executa a chamada de criação no backend
  // - router: navega para a listagem após salvar
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
  ){
    // Inicializa o formulário com valores padrão.
    this.form = {
      nome: ""
    };
  }

  // Envia os dados do formulário para criar uma nova categoria.
  salvar(){
    this.categoriaService.create(this.form).subscribe({
      // Sucesso: redireciona para a rota de listagem de categorias.
      next: _ => this.router.navigate(["/categorias"]),
      // Erro: mostra um aviso e registra no console para depuração.
      error: erro => {
        alert("Não foi possível cadastrar a categoria");
        console.error(erro);
      } 
    })
  }
}
