import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroService,Filme,Genero } from '../../services/cadastro.services';
import { FilmePopupComponent } from '../../core/filme-popup/filme-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilmePopupComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('popup') popup!: FilmePopupComponent;

  generos: Genero[];
  filmesSelecionados: Filme[];

  constructor(private cadastroService: CadastroService) {
    this.generos = this.cadastroService.generos;
    this.filmesSelecionados = this.cadastroService.filmesSelecionados;
    console.log(this.cadastroService.dadosCadastro)
  }

  abrirPopup(filme: any) {
    this.popup.open(filme.titulo, filme.descricao);
  }

  filmesPerfil = Array(20).fill(null);
  filmesSemana = Array(15).fill(null);
}
