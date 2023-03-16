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

  removeAll() {
    this.toasts = [];
  }

  showDefaultSuccessToast(message: string) {
    this.show(message, {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }

  showDefaultErrorToast(errorMessage: string) {
    if (errorMessage.length <= 0) {
      errorMessage = 'Something went wrong';
    }
    this.show(errorMessage, {
      classname: 'bg-danger text-light',
      delay: 10000,
    });
  }
}
