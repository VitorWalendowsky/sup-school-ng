import { Routes } from '@angular/router';
import { Calculadora } from './Components/calculadora/calculadora';
import { ListaPessoas } from './Components/lista-pessoas/lista-pessoas';
import { CalculadoraRetangulo } from './Components/calculadora-retangulo/calculadora-retangulo';
import { CadastroAluno } from './Components/cadastro-aluno/cadastro-aluno';
import { ListaAlunosComponent } from './Components/lista-alunos/lista-alunos';
import { CadastroTreino } from './Components/cadastro-treino/cadastro-treino';

export const routes: Routes = [
    {path: "calculadora", component: Calculadora},
    {path: "lista-pessoas", component: ListaPessoas},
    {path: "calculadora-retangulo", component: CalculadoraRetangulo},
    {path: "alunos", component: ListaAlunosComponent},
  {path: "alunos/cadastro", component: CadastroAluno},
  { path: '', redirectTo: 'cadastro-treino', pathMatch: 'full' },
  { path: 'cadastro-treino', component: CadastroTreino },
  {path: "aluno/editar/:id", component: CadastroAluno}
];
//SPA: Single Page Application