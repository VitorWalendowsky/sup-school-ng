import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CategoriaResponse } from '../../../models/categoria.dto';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../service/categoria.service';


@Component({
  selector: 'categoria-list',
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class CategoriaList implements OnInit {
  categoria: CategoriaResponse[] = [];

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(){
    this.categoriaService?.getAll().subscribe({
      next: categorias => this.categoria = categorias,
      error: erro => alert("Não foi possível carregar as categorias")
    });
  }
}
