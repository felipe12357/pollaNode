import {Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Modal } from './shared/modal/modal';
import { ErrorModalService } from './services/error-modal.service';
import { MenuComponent, MenuOption } from './shared/menu/menu.component';
import { UserRole } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly title = signal('polla');
  readonly errorModalService = inject(ErrorModalService);
  readonly userService = inject(UserService);
  
  readonly menuOptions: MenuOption[] = [
    { label: 'admin', route: '/admin', roles: [UserRole.ADMIN] },
    { label: 'Pronósticos', route: '/home', roles: [UserRole.ADMIN, UserRole.USER] },
  ];

  readonly currentRole = computed(()=> this.userService.currentUser()?.role);
}
