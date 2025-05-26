import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class EstadoService {
  private storageKey = 'dadosPagina';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get dadosPagina() {
    if (this.isBrowser) {
      const dadosJson = localStorage.getItem(this.storageKey);
      return dadosJson ? JSON.parse(dadosJson) : null;
    }
    return null;
  }

  set dadosPagina(valor: { 
    filmesIndicados?: any[], 
    filmesGeneros?: any[], 
    filmesTops?: any[],
  } | null) {
    if (this.isBrowser) {
      if (valor) {
        localStorage.setItem(this.storageKey, JSON.stringify(valor));
      } else {
        localStorage.removeItem(this.storageKey);
      }
    }
  }
}
