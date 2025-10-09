import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../../services/usuario.service';
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  imports: [Button, TableModule]
})
export class UsuarioList implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('Deseja realmente excluir este usuário?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => this.loadUsuarios(),
        error: erro => {
          alert("Não foi possível apagar o Usuário");
          console.error("Ocorreu um erro ao apagar o Usuário: " + erro);
        }
      });
    }
  }
}
