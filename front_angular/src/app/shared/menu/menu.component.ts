import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '../../models/user.model';

export interface MenuOption {
  label: string;
  route?: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
})
export class MenuComponent {
  options = input<MenuOption[]>([]);
  currentRole = input<UserRole>(UserRole.USER);

  visibleOptions = computed(() =>
    this.options().filter(option => option.roles.includes(this.currentRole()))
  );
}
