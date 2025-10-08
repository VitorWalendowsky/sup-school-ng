import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoriaResponse } from '../../../models/categoria.dto';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { RouterLink } from '@angular/router';

@Component({
  // Seletor usado no HTML para renderizar esta lista de categorias.
  selector: 'categoria-list',
  // Módulos que este componente standalone utiliza (PrimeNG Table/Button, utilitários Angular e RouterLink).
  imports: [ButtonModule, TableModule, CommonModule, RouterLink],
  // Caminho do template com a tabela/lista.
  templateUrl: './list.html',
  // Estilos específicos deste componente.
  styleUrl: './list.scss'
})
export class CategoriaList {
  // Array que armazena as categorias exibidas na tela.
  categorias: CategoriaResponse[] = [];

  // Injeta o serviço responsável por operações de categoria (HTTP/CRUD).
  constructor(private categoriaService: CategoriaService) {
  }

  // Lifecycle hook chamado quando o componente é inicializado.
  // Carregamos os dados assim que a tela montar.
  ngOnInit() {
    this.carregarCategorias();
  }

  // Busca todas as categorias no backend e preenche o array `categorias`.
  private carregarCategorias() {
    this.categoriaService.getAll().subscribe({
      // Sucesso: substitui o array local pelos dados vindos da API.
      next: categorias => this.categorias = categorias,
      // Erro: exibe uma mensagem simples ao usuário.
      error: erro => {
        alert("Não foi possível carregar as categorias");
        console.error("Ocorreu um erro ao carregar as categorias: " + erro)
      }
    });
  }

  // Remove a categoria pelo ID e, ao concluir, recarrega a lista.
  apagar(id: number) {
    this.categoriaService.delete(id).subscribe({
      // Sucesso: após deletar, atualiza a lista chamando o backend novamente.
      next: _ => this.carregarCategorias(),
      // Erro: avisa o usuário que não foi possível apagar.
      error: erro => {
        alert("Não foi possível apagar a categoria")
        console.error("Ocorreu um erro ao apagar as categoria: " + erro)
      }
    })
  }
}
