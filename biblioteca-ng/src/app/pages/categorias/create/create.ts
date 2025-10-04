import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaCadastroRequest } from '../../../models/categoria.dto';
import { ButtonModule } from 'primeng/button';
import { CategoriaService } from '../../../service/categoria.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-create',
  imports: [FormsModule, InputTextModule, ButtonModule], 
  templateUrl: './create.html',
  styleUrls: ['./create.scss'] 
})
export class CategoriaCreate {
  form: CategoriaCadastroRequest;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,) {
    this.form = {
      nome: ""
    };
  }

  salvar() {
    this.categoriaService.create(this.form).subscribe({
      next: resposta => this.router.navigate(["/categorias"]),
      error: erro => {
        alert("Não foi possivel cadastrar categoria");
        console.error(erro);
      }
    })
  }
}
