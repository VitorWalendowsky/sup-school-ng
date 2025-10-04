import { Routes } from '@angular/router';
import { CategoriaList } from './pages/categorias/list/list';
import { CategoriaCreate } from './pages/categorias/create/create';
import { CategoriaEdit } from './pages/categorias/edit/edit';

export const routes: Routes = [
    {path: "categorias", component: CategoriaList},
    {path: "categorias/cadastrar", component: CategoriaCreate},
    {path: "categorias/edditar/:id", component: CategoriaEdit},
    ];