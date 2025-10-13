import { Component } from '@angular/core';
import { LivroCadastroRequest } from '../../models/livro.dto';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMask, InputMaskModule } from 'primeng/inputmask';
import { AutorResponse } from '../../models/autor.dto';
import { AutorService } from '../../services/autor.service';
import { SelectModule } from 'primeng/select';
import { CategoriaResponse } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/categoria.service';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { LivroService } from '../../services/livro.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    InputTextModule,
    InputMaskModule,
    SelectModule,
    DatePickerModule,
    InputNumber,
    Textarea,
    Button,
    StepsModule,
    StepperModule,
    ToastModule,
  ],
  template: `
    <p-toast/>
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
                    />
                  
                </div>

                <div class="flex-grow-1">

                  <label for="campo-quantidade">Quantidade <span class="text-red-500">*</span></label>
                  <p-inputnumber 
                    inputId="integeronly" 
                    [(ngModel)]="form.quantidade"
                    [min]="1"
                    [max]="1000"
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
  styles: ``,
  providers: [MessageService, ],
})
export class LivroCreate {
  form: LivroCadastroRequest;

  autores: AutorResponse[] | undefined;
  categorias: CategoriaResponse[] | undefined;

  constructor(
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private livroService: LivroService,
    private messageService: MessageService,
  ) {
    this.form = {
      titulo: "Harry Potter e a Camara Secreta",
      resumo: "Sonseria e Grifinória são as únicas casas de HP",
      descricao: "Livro de Magia",
      anoPublicacao: new Date("1998-01-01"),
      autorId: 44,
      categoriaId: 52,
      isbn: "129-3-1030-1230-8",
      quantidade: 100
    }
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
        this.messageService.add({
          severity: "error",
          life: 5000,
          summary: "Aviso",
          detail: "Ocorreu um erro ao carregar as categorias"
        });
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
        this.messageService.add({
          severity: "error",
          life: 5000,
          summary: "Aviso",
          detail: "Ocorreu um erro ao carregar os autores"
        });
      }
    })
  }

  salvar(){
    this.livroService.create(this.form).subscribe({
      next: () => 
        this.messageService.add({
          severity: "success",
          summary: "Sucesso",
          detail: "Livro cadastrado com sucesso"
        }),
      error: erro => {
        console.error("Ocorreu um erro ao cadastrar o livro: " + erro);
        this.messageService.add({
          severity: "error",
          life: 5000,
          summary: "Aviso",
          detail: "Ocorreu um erro ao cadastrar o livro"
        });
      }
    })
  }
}
