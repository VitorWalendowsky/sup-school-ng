import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoriaResponse } from '../../../models/categoria.dto';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'categoria-list',
  imports: [ButtonModule, TableModule, CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class CategoriaList {
  categorias: CategoriaResponse[] = [];

  constructor(private categoriaService: CategoriaService){
  }

  ngOnInit(){
    this.carregarCategorias();
  }

  private carregarCategorias() {
    this.categoriaService.getAll().subscribe({
      next: categorias => this.categorias = categorias,
      error: erro => alert("Não foi possível carregar as categorias")
    });
  }

  apagar(id: number) {
    this.categoriaService.delete(id).subscribe({
      next: categorias => this.carregarCategorias(),
      error: erro => alert("Não foi possível apagar a categoria")
    })
  }
}
