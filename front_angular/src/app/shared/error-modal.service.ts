import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {
  readonly isOpen = signal(false);
  readonly title = signal('Error');
  readonly message = signal('Paso un error');

  showError(message: string): void {
    const normalizedMessage = message?.trim() ? message : 'Paso un error';

    this.message.set(normalizedMessage);
    this.title.set('Error');
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
