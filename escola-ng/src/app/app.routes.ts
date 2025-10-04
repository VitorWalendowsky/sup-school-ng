import { Routes } from '@angular/router';
import { Calculadora } from './Components/calculadora/calculadora';
import { ListaPessoas } from './Components/lista-pessoas/lista-pessoas';
import { CadastroAluno } from './Components/cadastro-aluno/cadastro-aluno';
import { ListaAlunosComponent } from './Components/lista-alunos/lista-alunos';
import { CadastroTreino } from './Components/cadastro-treino/cadastro-treino';
import { CadastroTurmas } from './Components/cadastro-turmas/cadastro-turmas';
import { CalculadoraRetanguloComponent } from './Components/calculadora-retangulo/calculadora-retangulo.component';
import { CategoriaList } from './Components/categoria-list/categoria-list';
import { CategoriaCreate } from './Components/categoria-create/categoria-create';

export const routes: Routes = [
    {path: "calculadora", component: Calculadora},
    {path: "lista-pessoas", component: ListaPessoas},
    {path: "calculadora-retangulo", component: CalculadoraRetanguloComponent},
    {path: "alunos", component: ListaAlunosComponent},
  {path: "alunos/cadastro", component: CadastroAluno},
  { path: '', redirectTo: 'cadastro-treino', pathMatch: 'full' },
  { path: 'cadastro-treino', component: CadastroTreino },
  {path: "aluno/editar/:id", component: CadastroAluno},
  {path: "aluno/editar/:id", component: CadastroTurmas},
  {path: "categorias", component: CategoriaList},
  {path: "categorias/cadastrar", component: CategoriaCreate},

];
//SPA: Single Page Application