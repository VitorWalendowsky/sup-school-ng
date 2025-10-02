import { Component, Input} from '@angular/core';


type tipos = "aviso" | "perigo" | "sucesso" | "padrão";

@Component({
  selector: 'botao',
  imports: [],
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.scss'
})
export class BotaoComponent {
  @Input() texto: string = "";
  @Input() tipo: tipos = "padrão";
}
