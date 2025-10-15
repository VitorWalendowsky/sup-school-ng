import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { UsuarioEditarRequest } from '../../../models/usuario.dtos';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    ButtonModule,
    InputMaskModule,
    InputTextModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class UsuarioEdit {
  form: UsuarioEditarRequest;

  id: number;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.form = {
      nome: "",
      email: "",
      telefone: "",
      endereco: ""
    }

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    this.carregarUsuario();
  }

  private carregarUsuario() {
    this.usuarioService.getById(this.id).subscribe({
      next: usuario => {
        this.form.nome = usuario.nome;

        this.form.email = usuario.email;

        this.form.endereco = usuario.endereco;

        this.form.telefone = usuario.telefone;
      }
    })
  }

  salvar() {
    this.usuarioService.update(this.id,this.form).subscribe({
      next: sucesso => this.router.navigate(["/usuarios"]),
      error: erro => {
        alert("Não foi possível fazer a atualização do usuário.");
        console.log("Ocorreu um erro ao tentar atualizar o usuário: " + erro);
      }
    })
  }
}
