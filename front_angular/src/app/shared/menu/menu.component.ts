import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface MenuOption {
  label: string;
  route?: string;
  roles: string[];
}

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  options = input<MenuOption[]>([]);
  currentRole = input<string>('guest');

  visibleOptions = computed(() =>
    this.options().filter(option => option.roles.includes(this.currentRole()))
  );
}
