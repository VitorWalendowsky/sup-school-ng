import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioCadastroRequest } from '../../../../models/usuario.dto';

@Component({
  selector: 'usuario-create',
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

  // Função para formatar telefone
  formatarTelefone(): void {
    if (!this.form.telefone) return;

    // Remove todos os caracteres que não são dígitos
    let telefoneNumeros = this.form.telefone.replace(/\D/g, '');

    // Aplica a formatação (XX) XXXXX-XXXX
    if (telefoneNumeros.length > 10) {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (telefoneNumeros.length > 5) {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (telefoneNumeros.length > 2) {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (telefoneNumeros.length > 0) {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{0,2})$/, '($1');
    }

    this.form.telefone = telefoneNumeros;
  }
}
