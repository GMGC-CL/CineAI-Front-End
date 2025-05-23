import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Genero {
  id: string;
  nome: string;
  selecionado: boolean;
  filmesSelecionados: Filme[];
}

export interface Filme {
  id_filme_tmdb: string;
  titulo: string;
  genero: string;
  media_votos: number;
  caminho_poster: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  generos: Genero[] = [
    { id: '27', nome: 'Terror', selecionado: false, filmesSelecionados: [] },
    { id: '10749', nome: 'Romance', selecionado: false, filmesSelecionados: [] },
    { id: '14', nome: 'Fantasia', selecionado: false, filmesSelecionados: [] },
    { id: '878', nome: 'Ficção científica', selecionado: false, filmesSelecionados: [] },
    { id: '35', nome: 'Comédia', selecionado: false, filmesSelecionados: [] },
    { id: '18', nome: 'Drama', selecionado: false, filmesSelecionados: [] },
    { id: '28', nome: 'Ação', selecionado: false, filmesSelecionados: [] }
  ];

  filmesSelecionados: Filme[] = [];
  private _dadosCadastro: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.carregarDadosDoStorage();
  }

  get dadosCadastro(): any {
    return this._dadosCadastro;
  }

  set dadosCadastro(value: any) {
    this._dadosCadastro = value;
    this.salvarDadosNoStorage();
  }

  private carregarDadosDoStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const dadosSalvos = sessionStorage.getItem('dadosCadastro');
        if (dadosSalvos) {
          this._dadosCadastro = JSON.parse(dadosSalvos);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do sessionStorage:', error);
        this._dadosCadastro = null;
      }
    }
  }

  private salvarDadosNoStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (this._dadosCadastro) {
          sessionStorage.setItem('dadosCadastro', JSON.stringify(this._dadosCadastro));
        } else {
          sessionStorage.removeItem('dadosCadastro');
        }
      } catch (error) {
        console.error('Erro ao salvar dados no sessionStorage:', error);
      }
    }
  }

  limparDadosUsuario(): void {
    this._dadosCadastro = null;
    this.filmesSelecionados = [];
    this.salvarDadosNoStorage();
  }
}
