import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroService,Filme,Genero } from '../../services/cadastro.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  generos: Genero[];
  filmesSelecionados: Filme[];


  constructor(private cadastroService: CadastroService) {
    this.generos = this.cadastroService.generos;
    this.filmesSelecionados = this.cadastroService.filmesSelecionados;
    console.log(this.cadastroService.dadosCadastro)
  }

  

  filmesPerfil = Array(20).fill(null);
  filmesSemana = Array(15).fill(null);
}
