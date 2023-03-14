import { Injectable } from '@angular/core';

export interface ToastInfo {
  text: string;
  classname: string;
  body?: string;
  delay: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(text: string, options: any = {}) {
    this.toasts.push({ text, ...options });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
