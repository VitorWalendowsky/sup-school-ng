import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select, SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { AutorResponse } from '../../models/autor.dtos';
import { CategoriaResponse } from '../../models/categoria.dto';
import { AutorService } from '../../services/autor.service';
import { CategoriaService } from '../../services/categoria.service';
import { LivroService } from '../../services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { LivroEditarRequest } from '../../models/livro.dtos';

@Component({
  selector: 'app-edit',
  imports: [
    StepperModule,
    ButtonModule,
    InputMaskModule,
    FormsModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    InputTextModule,
    DatePickerModule,
  ],
  template: `
    <div class="p-5">

      <p-stepper [value]="1" class="basis-[50rem]">
        <p-step-list>
            <p-step [value]="1">Dados Básicos</p-step>
            <p-step [value]="2">Descrição</p-step>
            <p-step [value]="3">Resumo</p-step>
        </p-step-list>
        <p-step-panels>
          <p-step-panel [value]="1">
            <ng-template #content let-activateCallback="activateCallback">
              <div class="flex w-full mw-full justify-content-evenly gap-2 mb-2">
                <div class="flex-grow-1">
                  <label for="campo-titulo">Título <span class="text-red-500">*</span></label>
                  <input type="text" pInputText [(ngModel)]="form.titulo" id="campo-titulo" fluid />
                </div>

                <div class="flex-grow-0">
                  <label for="campo-isbn">ISBN <span class="text-red-500">*</span></label>
                    <p-inputmask
                      mask="999-9-9999-9999-9"
                      [(ngModel)]="form.isbn" 
                      placeholder="999-9-9999-9999-9"
                      fluid 
                      id="campo-isbn" />
                </div>
              </div>
          
              <div class="flex w-full mw-full justify-content-evenly gap-2 mb-2">
                <div class="flex-grow-1">

                  <label for="campo-autor">Autor <span class="text-red-500">*</span></label>

                  <p-select 
                    [options]="autores" 
                    [(ngModel)]="form.autorId"      
                    optionLabel="nome" 
                    optionValue="id"
                    id="campo-autor"
                    [filter]="true"
                    filterBy="nome" 
                    placeholder="Selecione a autor" 
                    class="w-full md:w-56"
                    appendTo="body"/>
                </div>

                <div class="flex-grow-1">

                  <label for="campo-categoria">Categoria <span class="text-red-500">*</span></label>

                  <p-select 
                    [options]="categorias" 
                    [(ngModel)]="form.categoriaId"      
                    optionLabel="nome" 
                    optionValue="id"
                    id="campo-categoria"
                    [filter]="true"
                    filterBy="nome" 
                    placeholder="Selecione a categoria" 
                    class="w-full md:w-56"
                    appendTo="body"/>
                </div>
              </div>

              <div class="flex w-full mw-full justify-content-evenly gap-2 mb-2">
                <div class="flex-grow-1">

                  <label for="campo-ano-publicacao">Ano Publicação <span class="text-red-500">*</span></label>
                  <p-datepicker 
                    [(ngModel)]="form.anoPublicacao" 
                    view="year" 
                    dateFormat="yy"
                    fluid
                    appendTo="body"
                    />
                  
                </div>

                <div class="flex-grow-1">

                  <label for="campo-quantidade">Quantidade <span class="text-red-500">*</span></label>
                  <p-inputnumber 
                    inputId="integeronly" 
                    [(ngModel)]="form.quantidade"
                    [min]="1"
                    [max]="1000"
                    appendTo="body"
                    fluid/>
                </div>
              </div>
              <div class="flex pt-6 justify-content-end">
                <p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" (onClick)="activateCallback(2)" />
              </div>

            </ng-template>
          </p-step-panel>

          <p-step-panel [value]="2">
            <ng-template #content let-activateCallback="activateCallback">
              <div class="flex w-full mw-full justify-content-evenly gap-2 mb-2">
                <div class="flex-grow-1">
                  <label for="campo-descricao">Descrição <span class="text-red-500">*</span></label>
                  <textarea rows="20" [(ngModel)]="form.descricao" pTextarea [autoResize]="true" fluid></textarea>
                </div>
              </div>
              
              <div class="flex pt-6 justify-content-between gap-2">
                <p-button label="Anterior" severity="contrast" variant="outlined" icon="pi pi-arrow-left" iconPos="left" (onClick)="activateCallback(1)" />
                <p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" (onClick)="activateCallback(3)" />
              </div>
            </ng-template>
          </p-step-panel>
          <p-step-panel [value]="3">
            <ng-template #content let-activateCallback="activateCallback">
              <div class="flex w-full mw-full justify-content-evenly gap-2 mb-2">
                <div class="flex-grow-1">
                  <label for="campo-resumo">Resumo <span class="text-red-500">*</span></label>
                  <textarea rows="20" [(ngModel)]="form.resumo" pTextarea [autoResize]="true" fluid></textarea>
                </div>
              </div>

              
              
              <div class="flex pt-6 justify-content-between gap-2">
                <p-button label="Anterior" severity="contrast" variant="outlined" icon="pi pi-arrow-left" iconPos="left" (onClick)="activateCallback(2)" />
                <p-button label="Salvar" (click)="salvar()" icon="pi pi-save" />
              </div>
            </ng-template>
          </p-step-panel>
        </p-step-panels>
      </p-stepper>    
    </div>
  `,
  styles: ``
})
export class LivroEdit {
  form: LivroEditarRequest;

  id: number;

  autores: AutorResponse[] | undefined;

  categorias: CategoriaResponse[] | undefined;

  constructor(
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private livroService: LivroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.form = {
      titulo: "",
      resumo: "",
      descricao: "",
      anoPublicacao: null,
      autorId: null,
      categoriaId: null,
      isbn: "",
      quantidade: null,
    }

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    this.carregarLivro();
  }

   ngOnInit() {
    this.carregarAutores();
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.getAll().subscribe({
      next: categorias => {
        const categoriasOrdenados = categorias.sort((a, b) => a.nome.localeCompare(b.nome));
        this.categorias = categoriasOrdenados;
      },
      error: erro => {
        console.error("Ocorreu um erro ao carregar as categorias: " + erro);
        // this.messageService.add({
        //   severity: "error",
        //   life: 5000,
        //   summary: "Aviso",
        //   detail: "Ocorreu um erro ao carregar as categorias"
        // });
      }
    })
  }

  carregarAutores() {
    this.autorService.getAll().subscribe({
      next: autores => {
        const autoresOrdenados = autores.sort((a, b) => a.nome.localeCompare(b.nome));
        this.autores = autoresOrdenados;
      },
      error: erro => {
        console.error("Ocorreu um erro ao carregar os autores: " + erro);
        // this.messageService.add({
        //   severity: "error",
        //   life: 5000,
        //   summary: "Aviso",
        //   detail: "Ocorreu um erro ao carregar os autores"
        // });
      }
    })
  }

  private carregarLivro() {
    this.livroService.getById(this.id).subscribe({
      next: livro => {
        this.form.titulo = livro.titulo;
        this.form.resumo = livro.resumo;
        this.form.descricao = livro.descricao;
        this.form.anoPublicacao = livro.anoPublicacao;
        this.form.autorId = livro.autorId;
        this.form.categoriaId = livro.categoriaId;
        this.form.isbn = livro.isbn;
        this.form.quantidade = livro.quantidade;
      },
      error: erro => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Aviso',
        //   detail: 'Ocorreu um erro ao carregar os dados do livro'
        // })
        console.error("Ocorreu um erro ao carregar os dados do livro: " + erro);
      }
    })
  }

  salvar() {
    this.livroService.update(this.id, this.form).subscribe({
      next: sucesso => this.router.navigate(["/livros"]),
      error: erro => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Aviso',
        //   detail: 'Ocorreu um erro ao atualizar os dados do livro'
        // })
        console.error("Ocorreu um erro ao atualizar os dados do livro: " + erro);
      }
    })
  }
}

