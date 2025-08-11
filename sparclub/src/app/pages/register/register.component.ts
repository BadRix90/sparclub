import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role: 'admin' | 'kassenwart' | 'user' = 'user';
  loading = false;

  roles = [
    { value: 'user', label: 'Sparer' },
    { value: 'kassenwart', label: 'Kassenwart' },
    { value: 'admin', label: 'Administrator' }
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  onRegister(): void {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.showError('Bitte füllen Sie alle Felder aus');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showError('Passwörter stimmen nicht überein');
      return;
    }

    if (this.password.length < 6) {
      this.showError('Passwort muss mindestens 6 Zeichen haben');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showError('Bitte geben Sie eine gültige E-Mail-Adresse ein');
      return;
    }

    this.loading = true;

    this.authService.register(this.username, this.email, this.password, this.role).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess(response.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.showError(response.message);
        }
        this.loading = false;
      },
      error: () => {
        this.showError('Ein Fehler ist aufgetreten');
        this.loading = false;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 4000,
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}