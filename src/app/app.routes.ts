import { Routes } from '@angular/router';
import { Calculadora } from './Components/calculadora/calculadora';
import { ListaPessoas } from './Components/lista-pessoas/lista-pessoas';

export const routes: Routes = [
    {path: "calculadora", component: Calculadora},
    {path: "lista-pessoas", component: ListaPessoas}
    
];
//SPA: Single Page Application