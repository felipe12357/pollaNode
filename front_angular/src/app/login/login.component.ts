import { Component, inject, signal, computed } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../models/user.model';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
 
  private userService = inject(UserService);
  private router = inject(Router);
  
  formModel = signal<UserLogin>({
    username: 'admin',
    password: 'holamundo123',
  });

  // Register validators using the signals-based forms API
  loginForm = form(this.formModel, (fieldPath) => {
    required(fieldPath.username, { message: 'El nombre de usuario es obligatorio' });
    required(fieldPath.password, { message: 'La contraseña es obligatoria' });
  });


  login(event: Event): void {
    event.preventDefault();
    
    this.userService.login(this.formModel())
      .subscribe(() => this.router.navigate(['/home']));
  }

}
