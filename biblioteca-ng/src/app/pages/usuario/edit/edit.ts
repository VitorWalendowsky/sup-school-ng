import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario as Usuarios } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuarios= { id: 0, nome: '', email: '', telefone: '', endereco: '' };

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuarios(id).subscribe(data => this.usuario = data);
  }

  updateUsuario() {
    this.usuarioService.updateUsuario(this.usuario.id, this.usuario).subscribe(() => {
      this.router.navigate(['/usuario/list']);
    });
  }
}
