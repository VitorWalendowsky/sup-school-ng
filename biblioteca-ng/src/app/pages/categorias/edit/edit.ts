import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaEditarRequest } from '../../../models/categoria.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../service/categoria.service';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, ButtonModule, InputTextModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class CategoriaEdit {
  form: CategoriaEditarRequest;
  id: number;

  constructor(
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){
    this.form = { nome: ""} 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());
    this.carregarCategoria();
  }

  private carregarCategoria(){
    this.categoriaService.getById(this.id).subscribe({
      next: categoria => {
        this.form.nome = categoria.nome
      },
      error: erro => {
        console.error(erro);
        alert("Não foi possível carregar a categoria")
      }
    })
  }

  editar(){
    this.categoriaService.update(this.id, this.form).subscribe({
      next: resposta => this.router.navigate(["/categorias"]),
      error: erro => {
        console.error(erro);
        alert("Não foi possível atualizar a categoria")
      }
    })
  }

}
