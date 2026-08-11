import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {
  isOpen = signal(false);
  title = signal('Error');
  message = signal('Paso un error');
  

  showError(message: string): void {
    const normalizedMessage = message?.trim() ? message : 'Paso un error';
    this.message.set(normalizedMessage);
    this.title.set('Error');

    setTimeout(() => {
      this.isOpen.set(true);
    },1);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
