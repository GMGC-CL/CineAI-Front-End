import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount = 0;
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  show() {
    this.loadingCount++;
    this._isLoading.set(true);
  }

  hide() {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      this._isLoading.set(false);
    }
  }
}