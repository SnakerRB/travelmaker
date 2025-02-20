import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    this.error = null;
    try {
      await this.authService.login(this.credentials).toPromise();
      this.router.navigate(['/userpanel']);
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        this.error = 'Contraseña incorrecta';
      } else if (err.code === 'auth/user-not-found') {
        this.error = 'Usuario no encontrado';
      } else {
        this.error = 'Error inesperado';
      }
    }
  }
  async loginWithGoogle() {
    this.error = null;
    try {
      await this.authService.loginWithGoogle().toPromise();
      this.router.navigate(['/userpanel']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
