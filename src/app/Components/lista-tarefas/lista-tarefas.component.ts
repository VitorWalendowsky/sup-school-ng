import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-tarefas',
  imports: [FormsModule],
  templateUrl: './lista-tarefas.component.html',
  styleUrl: './lista-tarefas.component.scss'
})
export class ListaTarefasComponent {
  tarefa:string = "";

  tarefas: Array<string> = [];

  adicionar():void {
    this.tarefas.push(`${this.tarefa}`);
    this.tarefa = "";
  }

  apagar(tarefaParaApagar :string):void {
    let indiceParaApagar = this.tarefas.indexOf(tarefaParaApagar);
    this.tarefas.splice(indiceParaApagar, 1);
  }
}
