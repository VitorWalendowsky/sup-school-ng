import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { LivroResponse } from '../../models/livro.dto';
import { LivroService } from '../../services/livro.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { BadgeModule } from 'primeng/badge';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-list',
  imports: [
    RouterLink,
    Button,
    TableModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    BadgeModule,
    DrawerModule,
  ],
  template: `
    <p-drawer [(visible)]="resumoVisivel" header="Resumo">
        <p>
            {{livroSelecionado?.resumo}}
        </p>
    </p-drawer>

    <div class="mr-2 mt-2 ml-2">

      <div class="flex justify-content-end mt-2">
        <p-button label="Cadastrar" severity="info" icon="pi pi-plus" routerLink="cadastrar" />
      </div>

      <div class="flex w-full mw-full gap-2 mb-2">
        <div class="flex flex-column">

          <label for="campo-titulo">Título</label>
          <p-iconfield>
            <p-inputicon class="pi pi-search" />
            <input type="text" pInputText placeholder="Pesquisa"
              [(ngModel)]="titulo" id="campo-titulo" (keydown.enter)="carregarLivros()" />
          </p-iconfield>
        </div>
      </div>

      <div class="">
        <p-table 
          [value]="livros"
          [paginator]="true"
          [rows]="5"
          [rowsPerPageOptions]="[5, 10, 20]" 
          stripedRows bordered [tableStyle]="{ 'min-width': '50rem' }">
          <ng-template #header>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </ng-template>
          <ng-template #body let-livro>
            <tr>
              <td>{{ livro.id }}</td>
              <td>
                <p-button 
                  [label]="livro.titulo"
                  icon="pi pi-eye"
                  variant="text"
                  [severity]="obterCorCategoria(livro.categoria.nome)" 
                  (click)="apresentarDadosLivro(livro)" />

              </td>
              <td>{{ livro.autor.nome }}</td>
              <td>
  
                <!-- @if(livro.categoria.nome === "Fantasia"){
                  <p-badge [value]="livro.categoria.nome" severity="danger" />  
                  }@else if(livro.categoria.nome === "Ação"){
                    <p-badge [value]="livro.categoria.nome" severity="success" />  
                    } -->
                <p-badge [value]="livro.categoria.nome" 
                  [severity]="obterCorCategoria(livro.categoria.nome)" />  
                    
              </td>
              <td class="flex gap-2">
                <p-button label="Editar" icon="pi pi-pencil" severity="warn" routerLink="/livroes/editar/{{livro.id}}" />

                <p-button (click)="apagar(livro.id)" label="Apagar" icon="pi pi-trash" outlined severity="danger" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: ``
})
export class LivroList {
  livros: LivroResponse[] = [];
  titulo: string | null = null;
  resumoVisivel: boolean = false;
  livroSelecionado: LivroResponse | null = null;

  constructor(private livroService: LivroService) {
  }

  ngOnInit() {
    this.carregarLivros();
  }
  carregarLivros() {
    this.livroService.getAll(this.titulo).subscribe({
      next: livros => this.livros = livros,
      error: erro => {
        alert("Não foi possível carregar as livros");
        console.error("Ocorreu um erro ao carregar as livros: " + erro)
      }
    });
  }

  obterCorCategoria(categoria: string): "info" | "success" | "warn" | "danger" | "secondary" | "contrast" | null | undefined {
    switch (categoria) {
      case 'Terror': return 'danger';
      case 'Ação': return 'success';
      case 'Suspense': return 'warn';
      case 'Policial': return 'secondary';
      case 'Fantasia': return 'info';
      case 'Aventura': return 'success';
      case 'Drama': return 'contrast';
      default: return 'info';
    }
  }

  apagar(id: number) {
    this.livroService.delete(id).subscribe({
      // Sucesso: após deletar, atualiza a lista chamando o backend novamente.
      next: _ => this.carregarLivros(),
      // Erro: avisa o usuário que não foi possível apagar.
      error: erro => {
        alert("Não foi possível apagar o livro")
        console.error("Ocorreu um erro ao apagar o livro: " + erro)
      }
    })
  }

  apresentarDadosLivro(livro: LivroResponse) {
    this.livroSelecionado = livro;
    this.resumoVisivel = true;
  }
}
