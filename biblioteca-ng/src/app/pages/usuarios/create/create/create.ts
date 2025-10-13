import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioCadastroRequest } from '../../../../models/usuario.dto';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [UsuarioService],
  templateUrl: './create.html',
  styleUrls: ['./create.scss']
})
export class UsuarioCreate {
  form: UsuarioCadastroRequest = {
    id: undefined,
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  constructor(
    @Inject(UsuarioService) private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  // Função para salvar o usuário
  async salvar() {
    try {
      // Enviar o formulário para o serviço
      const usuarioCriado = await this.usuarioService.create(this.form).toPromise();
      // Redireciona para a lista de usuários após a criação
      this.router.navigate(['/usuarios']);
    } catch (erro) {
      alert('Não foi possível cadastrar o usuário');
      console.error(erro);
    }
  }
}
