import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioCadastrarRequest, UsuarioResponse } from '../../../models/usuario.dtos';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class UsuarioEdit {
  usuario: UsuarioCadastrarRequest = {
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  carregando = false;
  usuarioId!: number;
form: any;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.usuarioId) {
      this.carregarUsuario(this.usuarioId);
    }
  }

  carregarUsuario(id: number) {
    this.carregando = true;
    this.usuarioService.getById(id).subscribe({
      next: (res: UsuarioResponse) => {
        this.usuario = {
          nome: res.nome,
          email: res.email,
          telefone: res.telefone,
          endereco: res.endereco
        };
        this.carregando = false;
      },
      error: (erro) => {
        this.carregando = false;
        alert('Não foi possível carregar o usuário.');
        console.error('Erro ao carregar usuário:', erro);
      }
    });
  }

  salvar() {
    this.carregando = true;
    this.usuarioService.update(this.usuarioId, this.usuario).subscribe({
      next: () => {
        this.carregando = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
        this.router.navigate(['/usuarios']);
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar usuário.' });
        console.error('Erro ao atualizar usuário:', erro);
      }
    });
  }
}
