import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-reactive-login',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-login.html',
  styleUrl: './reactive-login.scss',
})
export class ReactiveLogin {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  protected readonly form = this.fb.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();
    this.userService.login({ username: username ?? '', password: password ?? '' }).subscribe();
  }
}
