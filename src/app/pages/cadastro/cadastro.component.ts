import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService, } from '../../services/api.service';
import { Router } from '@angular/router';
import { CadastroService,Filme,Genero } from '../../services/cadastro.services';



@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  
  generos: Genero[];
  filmesSelecionados: Filme[];


  constructor(private router: Router,private  MovieService: ApiService, private cadastroService: CadastroService) {
    this.generos = this.cadastroService.generos;
    this.filmesSelecionados = this.cadastroService.filmesSelecionados;
  }



  generoSelecionado: Genero | null = null;
  filmesPorGenero: Filme[] = [];


  
  onGeneroChange(genero: Genero): void {
    genero.selecionado = !genero.selecionado;

    if (genero.selecionado) {
      this.generoSelecionado = genero;

      this.MovieService.get_filme_genre(genero.id, '10').subscribe({
        next: (response: Filme[]) => {
          this.filmesPorGenero = response;
          this.filmesSelecionados = [...genero.filmesSelecionados];
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          this.filmesPorGenero = [];
        }
      });
    } else {
      genero.filmesSelecionados = [];

      if (this.generoSelecionado?.id === genero.id) {
        this.fecharModal();
      }
    }
  }


  toggleFilmeSelecionado(filme: Filme): void {
    const index = this.filmesSelecionados.findIndex(f => f.id_filme_tmdb === filme.id_filme_tmdb);
    
    if (index > -1) {
      this.filmesSelecionados.splice(index, 1);
    } else if (this.filmesSelecionados.length < 3) {
      this.filmesSelecionados.push(filme);
    }
  }

  isFilmeSelecionado(filme: Filme): boolean {
    return this.filmesSelecionados.some(f => f.id_filme_tmdb === filme.id_filme_tmdb);
  }

  confirmarFilmes(): void {
    if (this.generoSelecionado) {
      this.generoSelecionado.filmesSelecionados = [...this.filmesSelecionados];
      this.fecharModal();
    }
  }

  fecharModal(): void {
    this.generoSelecionado = null;
    this.filmesSelecionados = [];
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const dadosCadastro = {
        nome: form.value.nome,
        email: form.value.email,
        senha: form.value.senha,
        generosPreferidos: this.generos.filter(g => g.selecionado),
        filmesPreferidos: this.getTodosFilmesSelecionados()
      };

         this.cadastroService.dadosCadastro = dadosCadastro;

        let nome = form.value.nome;
        let email = form.value.email;
        let senha = form.value.senha;
      //pega todos os filmes e pesquisa a similaridade
        this.MovieService.registrar(nome,email,senha).subscribe({
        next: (response: Filme[]) => {
           this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          this.filmesPorGenero = [];
        }
      });






      console.log('Dados do cadastro:', dadosCadastro);
      // Aqui você pode adicionar a lógica para enviar os dados
    }
  }

  private getTodosFilmesSelecionados(): Filme[] {
    return this.generos
      .filter(g => g.selecionado)
      .flatMap(g => g.filmesSelecionados);
  }
}