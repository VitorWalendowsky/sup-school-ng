import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoriaResponse } from '../../../models/categoria.dto';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../service/categoria.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'categoria-list',
  imports: [ButtonModule, TableModule, CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class CategoriaList {
 categoria: CategoriaResponse[] = [];

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(){
    this.carregarCategorias();
  }
  private carregarCategorias() {
    this.categoriaService?.getAll().subscribe({
      next: categorias => this.categoria = categorias,
      error: erro => alert("Não foi possível carregar as categorias")
    });
  }

  apagar(id: number){
    this.categoriaService.delete(id).subscribe({
      next: categorias => this.carregarCategorias,
      error: erro => alert("Não foi possivel apagar a categoria")
    })
  }}
