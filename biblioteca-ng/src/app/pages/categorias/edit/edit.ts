import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaEditarRequest } from '../../../models/categoria.dto';
import { CategoriaService } from '../../../service/categoria.service';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, ButtonModule,InputTextModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class CategoriaEdit {
    form: CategoriaEditarRequest;

    constructor(private categoriaService: CategoriaService) {
        this.form = {
            nome: ''
        }

    }
    editar() {
        
    }
}
