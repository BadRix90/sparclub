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
  // Hardcoded Sparclub Users
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@sparclub.de',
      password: 'admin123',
      createdAt: new Date('2024-01-01'),
      role: 'admin'
    },
    {
      id: '2',
      username: 'kassenwart',
      email: 'kassenwart@sparclub.de',
      password: 'kasse2024',
      createdAt: new Date('2024-01-01'),
      role: 'kassenwart'
    },
    {
      id: '3',
      username: 'stellvertreter',
      email: 'stellvertreter@sparclub.de',
      password: 'stell2024',
      createdAt: new Date('2024-01-01'),
      role: 'kassenwart'
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

  // Anmeldung
  login(username: string, password: string): Observable<AuthResponse> {
    return new Observable(observer => {
      // Simuliere API Delay
      setTimeout(() => {
        const user = this.users.find(u => 
          u.username === username && u.password === password
        );

        if (user) {
          // Session setzen
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