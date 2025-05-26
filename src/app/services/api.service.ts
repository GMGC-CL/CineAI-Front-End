import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://cineai-api.onrender.com';

  constructor(private http: HttpClient) {}

  // login
  login(email: string, senha: string): Observable<any> {
    const body = { email, senha };
    return this.http.post<any>(`${this.baseUrl}/usuarios/login`, body);
  }

  // registrar
  registrar(nome: string, email: string, senha: string): Observable<any> {
    const body = { nome, email, senha };
    return this.http.post<any>(`${this.baseUrl}/usuarios/registrar`, body);
  }

  // filmes por gênero
  get_filme_genre(genre_id: string, limit: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/genre/${genre_id}?limit=${limit}`);
  }

  // salvar preferências de filme
  put_preference(usuario_id: string, filme_id: string): Observable<any> {
    const body = { usuario_id, filme_id };
    return this.http.post<any>(`${this.baseUrl}/movies/preferencia`, body);
  }

  // salvar preferências de gênero
  put_genre_preference(usuario_id: string, genero_id: string): Observable<any> {
    const body = { usuario_id, genero_id };
    return this.http.post<any>(`${this.baseUrl}/movies/genero/preferencia`, body);
  }

  // obter preferências de filmes
  get_preference(user_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/preferencias/${user_id}`);
  }

  // obter preferências de gêneros
  get_genre_preference(user_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/preferencias/genero/${user_id}`);
  }

  // filmes similares
  get_similar(filme_id: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/${filme_id}/similar?limit=${limit}`);
  }

  // filmes por gênero
  get_film_genre(genre_id: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/genre/${genre_id}?limit=${limit}`);
  }

  // todos os filmes
  get_film(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies?limit=24`);
  }

  // buscar filme por nome
  get_film_name(filme_nome: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/name/${filme_nome}`);
  }

  // buscar filme por ID
  get_film_by_id(filme_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/${filme_id}`);
  }

  // obter avaliações do filme
  get_rates(filme_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/${filme_id}/avaliacoes`);
  }

  // enviar avaliação do usuário
  post_rate_user(filme_id: string, usuario_id: string, nota: number, comentario: string): Observable<any> {
    const body = { usuario_id, nota, comentario };
    return this.http.post<any>(`${this.baseUrl}/movies/${filme_id}/avaliar`, body);
  }

  // buscar todas as avaliações de um usuário
  get_avaliacoes_usuario(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios/${user_id}/avaliacoes`,);
  }
}
