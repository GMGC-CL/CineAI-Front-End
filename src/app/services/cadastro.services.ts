import { Injectable } from '@angular/core';

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
  caminho_poster:string;
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

    // Nova variável para armazenar os dados do cadastro
 dadosCadastro: any = null;

  constructor() { }
}
