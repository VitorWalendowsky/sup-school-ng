import { Routes } from '@angular/router';
import { Calculadora } from './Components/calculadora/calculadora';
import { ListaPessoas } from './Components/lista-pessoas/lista-pessoas';
import { CalculadoraRetangulo } from './Components/calculadora-retangulo/calculadora-retangulo';

export const routes: Routes = [
    {path: "calculadora", component: Calculadora},
    {path: "lista-pessoas", component: ListaPessoas},
    {path: "calculadora-retangulo", component: CalculadoraRetangulo}
    
];
//SPA: Single Page Application