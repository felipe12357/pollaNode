# Instrucciones del proyecto

-carpeta para el proyecto de angular: front_angular

--para la creacion de Forms utilizando signals sigue el siguiente ejemplo:

  formModel = signal<UserLogin>({
    username: '',
    password: '',
  });

  loginForm = form(this.formModel, (fieldPath) => {
    required(fieldPath.username, { message: 'El nombre de usuario es obligatorio' });
    required(fieldPath.password, { message: 'La contraseña es obligatoria' });
  });

y en el template:
```html
<form (submit)="login($event)" class="container login-component">
  <div>
    <div>
      <label> Nombre de Usuario:</label>
      <input [formField]="loginForm.username" type="text"  />
      @if (loginForm.username().invalid() && loginForm.username().touched()) {
        <div class="error">
          @for (error of loginForm.username().errors(); track error.kind) {
            <span>{{ error.message }}</span>
          }
        </div>
      }
    </div>
    <div>
      <label>Contraseña:</label>
      <input [formField]="loginForm.password" type="password"  />
      @if (loginForm.password().invalid() && loginForm.password().touched()) {
        <div class="error">
          @for (error of loginForm.password().errors(); track error.kind) {
            <span>{{ error.message }}</span>
          }
        </div>
      }
    </div>
  </div>
  <div>
    <button class='button' type="submit">Ingresar</button> 
  </div>
</form>

```
