import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioCadastrarRequest } from '../../../models/usuario.dtos';

@Component({
  selector: 'app-create',
  imports: [
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class UsuarioCreate {
  form: UsuarioCadastrarRequest;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.form = {
      nome: "",
      email: "",
      telefone: "",
      endereco: ""
    }
   }

   salvar() {
    this.usuarioService.create(this.form).subscribe({
      next: sucesso => this.router.navigate(["/usuarios"]),
      error: erro => {
        alert("Não foi possível criar o usuário.");
        console.error("Ocorreu um erro ao tentar criar o usuário: " + erro);
      }
    })
   }
}
