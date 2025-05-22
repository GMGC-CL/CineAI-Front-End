import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EstadoService {

  private storageKey = 'dadosPagina';

  get dadosPagina() {
    const dadosJson = localStorage.getItem(this.storageKey);
    return dadosJson ? JSON.parse(dadosJson) : null;
  }

  set dadosPagina(valor: { filmesIndicados?: any[], filmesGeneros?: any[], filmesTops?: any[]} | null) {
    if (valor) {
      localStorage.setItem(this.storageKey, JSON.stringify(valor));
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }
}

