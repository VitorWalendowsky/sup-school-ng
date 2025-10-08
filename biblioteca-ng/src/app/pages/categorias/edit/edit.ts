import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaEditarRequest } from '../../../models/categoria.dto';
import { CategoriaService } from '../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

// Declaração do componente como "standalone" (usa 'imports' direto no decorator).
@Component({
  // Seletor usado no HTML para instanciar este componente.
  selector: 'app-edit',
  // Módulos que este componente precisa (Forms para ngModel, PrimeNG para UI).
  imports: [FormsModule, ButtonModule, InputTextModule],
  // Caminho do template HTML deste componente.
  templateUrl: './edit.html',
  // Caminho do arquivo de estilos (Angular 17+ aceita 'styleUrl' no singular).
  styleUrl: './edit.scss'
})
export class CategoriaEdit {
  // Objeto do formulário, tipado pelo DTO de edição (contém ao menos 'nome').
  form: CategoriaEditarRequest;
  // ID da categoria lida a partir da rota (ex.: /categorias/editar/123).
  id: number;

  // Injeção de dependências via construtor:
  // - categoriaService: faz as requisições (getById, update, etc.)
  // - activatedRoute: permite acessar parâmetros da rota atual
  // - router: permite redirecionar após salvar
  constructor(
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){
    // Inicializa o formulário com valores padrão (nome vazio).
    this.form = { nome: ""};

    // Lê o parâmetro 'id' da rota:
    // - snapshot: pega o estado atual sem observar mudanças futuras
    // - paramMap.get("id"): retorna string | null
    // - !.toString(): usa non-null assertion porque espera que exista
    // - parseInt(...): converte a string para número inteiro
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    // Carrega os dados da categoria para preencher o formulário.
    this.carregarCategoria();
  }

  // Método privado que busca a categoria pelo ID e preenche o formulário.
  private carregarCategoria(){
    // Chama o serviço e se inscreve (Observable) para receber a resposta.
    this.categoriaService.getById(this.id).subscribe({
      // next: quando a chamada retorna com sucesso,
      // atualiza o formulário com o nome vindo do backend.
      next: categoria => {
        this.form.nome = categoria.nome
      },
      // error: se ocorrer erro na chamada, loga e avisa o usuário.
      error: erro => {
        console.error(erro);
        alert("Não foi possível carregar a categoria")
      }
    })
  }

  // Método chamado ao submeter a edição (ex.: (click) no botão "Salvar").
  editar(){
    // Dispara a atualização passando o ID e o objeto do formulário.
    this.categoriaService.update(this.id, this.form).subscribe({
      // next: ao sucesso, navega de volta para a listagem de categorias.
      next: resposta => this.router.navigate(["/categorias"]),
      // error: em caso de falha, loga e mostra mensagem ao usuário.
      error: erro => {
        console.error(erro);
        alert("Não foi possível atualizar a categoria")
      }
    })
  }
}
