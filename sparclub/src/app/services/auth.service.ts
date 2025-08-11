import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: 'admin' | 'kassenwart' | 'user';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // In-Memory Database
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@sparclub.de',
      password: 'admin123',
      createdAt: new Date(),
      role: 'admin'
    }
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {}

  // Observables
  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Registrierung
  register(username: string, email: string, password: string, role: 'admin' | 'kassenwart' | 'user' = 'user'): Observable<AuthResponse> {
    return new Observable(observer => {
      // Validierung
      if (!username || !email || !password) {
        observer.next({ success: false, message: 'Alle Felder sind erforderlich' });
        observer.complete();
        return;
      }

      if (password.length < 6) {
        observer.next({ success: false, message: 'Passwort muss mindestens 6 Zeichen haben' });
        observer.complete();
        return;
      }

      // Prüfen ob User bereits existiert
      if (this.users.some(u => u.username === username)) {
        observer.next({ success: false, message: 'Benutzername bereits vergeben' });
        observer.complete();
        return;
      }

      if (this.users.some(u => u.email === email)) {
        observer.next({ success: false, message: 'Email bereits registriert' });
        observer.complete();
        return;
      }

      // User erstellen
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date(),
        role
      };

      // In Memory Database speichern
      this.users.push(newUser);

      // Erfolg
      const { password: _, ...userWithoutPassword } = newUser;
      observer.next({ 
        success: true, 
        message: 'Registrierung erfolgreich!', 
        user: userWithoutPassword 
      });
      observer.complete();
    });
  }

  // Anmeldung
  login(username: string, password: string): Observable<AuthResponse> {
    return new Observable(observer => {
      // Simuliere API Delay
      setTimeout(() => {
        const user = this.users.find(u => 
          u.username === username && u.password === password
        );

        if (user) {
          // Session setzen (in memory)
          this.currentUserSubject.next(user);
          const { password: _, ...userWithoutPassword } = user;
          
          observer.next({ 
            success: true, 
            message: 'Anmeldung erfolgreich!', 
            user: userWithoutPassword 
          });
        } else {
          observer.next({ 
            success: false, 
            message: 'Ungültige Anmeldedaten' 
          });
        }
        observer.complete();
      }, 800);
    });
  }

  // Abmeldung
  logout(): void {
    this.currentUserSubject.next(null);
  }

  // Utility
  getAllUsers(): User[] {
    return this.users.map(u => ({ ...u, password: '***' }) as User);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Debug: Alle User anzeigen
  debugUsers(): void {
    console.log('Registered Users:', this.users.map(u => ({ 
      username: u.username, 
      email: u.email, 
      role: u.role 
    })));
  }
}