import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  username = signal<string>('admin');
  password = signal<string>('holamundo123');
  private userService = inject(UserService);
  private router = inject(Router);


  login(): void {
    this.userService.login({username: this.username(), password:this.password()})
    .subscribe(val => this.router.navigate(['/home']));
    /* .subscribe({
      next:(response) => {
      console.log(response);
      }, error: (err) => {
        console.log(err);
      }
    }); */
  }

}
