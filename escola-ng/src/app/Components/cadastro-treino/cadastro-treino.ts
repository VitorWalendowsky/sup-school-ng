import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-treino',
  imports: [FormsModule],
  templateUrl: './cadastro-treino.html',
  styleUrl: './cadastro-treino.scss'
})
export class CadastroTreino {

 treino: any = {
    nome: '',
    idade: null,
    peso: null,
    altura: null,
    objetivo: '',
    exercicios: []
  };

  treinosSalvos: any[] = [];
  editIndex: number | null = null; // controla se estamos editando

  ngOnInit() {
    this.carregarTreinos();
  }

  adicionarExercicio() {
    this.treino.exercicios.push({
      nome: '',
      series: null,
      repeticoes: null
    });
  }

  removerExercicio(index: number) {
    this.treino.exercicios.splice(index, 1);
  }

  salvarTreino() {
    if (this.editIndex !== null) {
      // Atualiza treino existente
      this.treinosSalvos[this.editIndex] = { ...this.treino };
      this.editIndex = null;
      alert('Treino atualizado com sucesso!');
    } else {
      // Cria novo treino
      this.treinosSalvos.push({ ...this.treino });
      alert('Treino salvo com sucesso!');
    }

    localStorage.setItem('treinos', JSON.stringify(this.treinosSalvos));

    // Resetar formulário
    this.treino = {
      nome: '',
      idade: null,
      peso: null,
      altura: null,
      objetivo: '',
      exercicios: []
    };
  }

  carregarTreinos() {
    const dados = localStorage.getItem('treinos');
    if (dados) {
      this.treinosSalvos = JSON.parse(dados);
    }
  }

  removerTreino(index: number) {
    this.treinosSalvos.splice(index, 1);
    localStorage.setItem('treinos', JSON.stringify(this.treinosSalvos));
  }

  editarTreino(index: number) {
    this.treino = JSON.parse(JSON.stringify(this.treinosSalvos[index])); // clona para não alterar direto
    this.editIndex = index;
  }
}