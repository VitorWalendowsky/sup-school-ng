import { Component } from '@angular/core';
import { AutorResponse } from '../../../models/autor.dto';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
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
        console.error("Não foi possível carregar os autores: " + erro)
      }
    })
  }

  apagar(id: number) {
    this.autorService.delete(id).subscribe({
      next: _ => this.carregarAutores(),
      error: erro => {
        alert("Não foi possível apagar a autor")
        console.error("Ocorreu um erro ao apagar as autor: " + erro)
      }
    })
  }
}
