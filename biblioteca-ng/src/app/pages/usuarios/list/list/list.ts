import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioResponse } from '../../../../models/usuario.dto';

@Component({
  selector: 'UsuarioList',
  imports: [TableModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class UsuarioList {
  usuarios: UsuarioResponse[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  private carregarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: erro => {
        alert("Não foi possível carregar os usuários");
        console.error("Não foi possível carregar os usuários: " + erro)
      }
    })
  }

  apagar(id: number) {
    this.usuarioService.delete(id).subscribe({
      next: _ => this.carregarUsuarios(),
      error: erro => {
        alert("Não foi possível apagar o usuário")
        console.error("Ocorreu um erro ao apagar o usuário: " + erro)
      }
    })
  }
}
