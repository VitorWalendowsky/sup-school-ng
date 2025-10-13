import { Routes } from '@angular/router';
import { CategoriaList } from './pages/categorias/list/list';
import { CategoriaCreate } from './pages/categorias/create/create';
import { CategoriaEdit } from './pages/categorias/edit/edit';
import { AutorList } from './pages/autores/list/list';
import { AutorCreate } from './pages/autores/create/create';
import { AutorEdit } from './pages/autores/edit/edit';
import { LivroCreate } from './pages/livros/create';
import { LivroList } from './pages/livros/list';

export const routes: Routes = [
    { path: "categorias", component: CategoriaList },
    { path: "categorias/cadastrar", component: CategoriaCreate },
    { path: "categorias/editar/:id", component: CategoriaEdit },
    { path: "autores", component: AutorList },
    { path: "autores/cadastrar", component: AutorCreate },
    { path: "autores/editar/:id", component: AutorEdit },
    { path: "livros", component: LivroList },
    { path: "livros/cadastrar", component: LivroCreate },
];