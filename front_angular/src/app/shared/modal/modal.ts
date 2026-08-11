import { Component, input, output, inject, ChangeDetectorRef, effect } from '@angular/core';
import { ErrorModalService } from '../../services/error-modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly errorModalService = inject(ErrorModalService);
  private readonly cdr = inject(ChangeDetectorRef);
  constructor() {
    effect(() => {
      console.log('APP MESSAGE:', this.errorModalService.message());
       this.cdr.markForCheck();
    });
  }

  close(): void {
    this.errorModalService.close();
  }
}
