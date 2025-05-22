import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroService, Filme, Genero } from '../../services/cadastro.services';
import { ApiService } from '../../services/api.service';
import { Router, NavigationEnd } from '@angular/router'; // ⬅️ IMPORTAR Router
import { EstadoService } from '../../services/estado.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';



interface DadosPagina {
  filmesIndicados: Filme[];
  filmesGeneros: Filme[];
  filmesTops: Filme[];
  }


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {

  
  generos: Genero[];
  filmesSelecionados: Filme[];
  idEscolha:string | undefined;
  idUser:string | undefined;

    constructor(
      private cadastroService: CadastroService,
      private movieService: ApiService,
      private router: Router,
      private estadoService: EstadoService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.generos = this.cadastroService.generos;
      this.filmesSelecionados = this.cadastroService.filmesSelecionados;

      if (isPlatformBrowser(this.platformId)) {
        const dados = this.cadastroService.dadosCadastro;
        if (dados && dados.idUser) {
          this.idUser = dados.idUser;
        } else {
          console.warn('⚠️ dadosCadastro ou idUser está vazio.');
        }
      }
    }


    meusDados: DadosPagina | null = null;

    filmesIndicados: Filme[] = [];
    filmesGeneros: Filme[] = [];
    filmesTops: Filme[] = [];

    searchQuery: string = '';
    filmesEncontrados: any[] = [];
    pesquisando: boolean = false;


  ngOnInit(): void {
    console.log(this.estadoService.dadosPagina)
    if (this.estadoService.dadosPagina) {
      console.log("aqui")
      this.meusDados = this.estadoService.dadosPagina as DadosPagina;
      this.filmesIndicados = this.meusDados.filmesIndicados || [];
      this.filmesTops = this.meusDados.filmesTops || [];
      this.filmesGeneros = this.meusDados.filmesGeneros || [];
    } else if (this.idUser) {
      console.log("aqui")
      this.CarregarFilmes();
    }
    
  }
  salvarEstado() {
    this.estadoService.dadosPagina = this.meusDados;
  }

  atualizarMeusDados() {
  this.meusDados = {
    filmesTops: this.filmesTops,
    filmesIndicados: this.filmesIndicados,
    filmesGeneros: this.filmesGeneros
  };
  this.salvarEstado();
}

buscarFilmes() {
  this.pesquisando = true;
  this.filmesEncontrados = [];

    forkJoin({
      filmesEncontrados: this.movieService.get_film_name(this.searchQuery.toLowerCase())
    }).subscribe(({ filmesEncontrados}) => {
      this.filmesEncontrados = filmesEncontrados;
    });

    if (!this.searchQuery.toLowerCase()){
      this.pesquisando = false
    }
}


CarregarFilmes() {
  if (!this.idUser) return;

  forkJoin({
    preferencias: this.movieService.get_preference(this.idUser),
    generos: this.movieService.get_genre_preference(this.idUser)
  }).subscribe(({ preferencias, generos }) => {
    const indicacaoFilme = preferencias[Math.floor(Math.random() * preferencias.length)]?.filme_id;
    const indicacaoGenero = generos[Math.floor(Math.random() * generos.length)]?.id_genero;

    forkJoin({
      filmesIndicados: this.movieService.get_similar(indicacaoFilme, 15),
      filmesGeneros: this.movieService.get_film_genre(indicacaoGenero, 20),
      filmesTops: this.movieService.get_film()
    }).subscribe(({ filmesIndicados, filmesGeneros,filmesTops }) => {
      this.filmesIndicados = filmesIndicados;
      this.filmesGeneros = filmesGeneros;
      this.filmesTops = filmesTops;
      this.atualizarMeusDados(); // só atualiza depois que os dois chegaram

    });
  });

  

}


  
    // ✅ Funções para scroll do carrossel
  scrollLeft(containerId: string) {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollTo({
        left: container.scrollLeft - 300,
        behavior: 'smooth'
      });
    }
  }

  scrollRight(containerId: string) {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollTo({
        left: container.scrollLeft + 300,
        behavior: 'smooth'
      });
    }
  }}


