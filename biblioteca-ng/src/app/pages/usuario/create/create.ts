import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './create.html',
  styleUrls: ['./create.scss']
})
export class UsuarioCreate {
  usuario: Usuario = {
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  saveUsuario(): void {
    this.usuarioService.createUsuario(this.usuario).subscribe(() => {
      this.router.navigate(['/usuario/list']);
    });
  }
}
