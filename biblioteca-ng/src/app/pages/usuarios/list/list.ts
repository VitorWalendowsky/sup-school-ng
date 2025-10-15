import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioResponse } from '../../../models/usuario.dtos';

@Component({
  selector: 'app-list',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class UsuarioList {
  usuarios: UsuarioResponse[] = [];

  constructor(private usuarioService: UsuarioService) { };

  ngOnInit() {
    this.carregarUsuarios();
  }

  private carregarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: erro => {
        alert("Não foi possível carregar os usuários");
        console.error("Ocorreu um erro ao tentar carregar os usuários: " + erro);
      }
    })
  }

  apagar(id: number) { 
    this.usuarioService.delete(id).subscribe({
      next: sucesso => this.carregarUsuarios(),
      error: erro => {
        alert("Não foi possível apagar o usuário.");
        console.error("Ocorreu um erro ao tentar apagar o usuário: " + erro);
      }
    })
  }
}
