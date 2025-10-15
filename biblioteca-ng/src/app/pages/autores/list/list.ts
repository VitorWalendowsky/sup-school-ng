import { Component } from '@angular/core';
import { AutorResponse } from '../../../models/autor.dtos';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AutorService } from '../../../services/autor.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [TableModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class AutorList {
  autores: AutorResponse[] = [];

  constructor(private autorService: AutorService) { }

  ngOnInit() {
    this.carregarAutores();
  }

  private carregarAutores() {
    this.autorService.getAll().subscribe({
      next: autores => this.autores = autores,
      error: erro => {
        alert("Não foi possível carregar os autores");
        console.error("Ocorreu um erro ao carregar os autores: " + erro)
      }
    });
  }

  apagar(id: number) {
    this.autorService.delete(id).subscribe ({
      next: sucesso => this.carregarAutores(),
      error: erro => {
        alert("Não foi possível apagar o autor.");
        console.error("Ocorreu um erro ao apagar o autor: " + erro);
      }
    })
  }
}
