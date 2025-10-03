import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaCadastroRequest } from '../../../models/categoria.dto';

@Component({
  selector: 'app-create',
  imports: [FormsModule, InputTextModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {
  form: CategoriaCadastroRequest;

  constructor(){
    this.form = {
      nome: ""
    };
  }
}
