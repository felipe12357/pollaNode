import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Modal } from './shared/modal/modal';
import { ErrorModalService } from './shared/error-modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('polla');
  protected readonly errorModalService = inject(ErrorModalService);
}
