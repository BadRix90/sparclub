import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService, User } from '../../services/auth.service';

interface DashboardStats {
  totalSparer: number;
  totalEinzahlungen: number;
  totalAuszahlungen: number;
  gesamtGuthaben: number;
  aktiveSparer: number;
}

@Component({
  selector: 'app-main-dashboard',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentUser: User | null = null;
  allUsers: User[] = [];
  selectedSparer: User | null = null;
  
  stats: DashboardStats = {
    totalSparer: 0,
    totalEinzahlungen: 1850,
    totalAuszahlungen: 320,
    gesamtGuthaben: 1530,
    aktiveSparer: 0
  };

  recentActivities = [
    { type: 'einzahlung', user: 'Max Mustermann', amount: 150, date: new Date() },
    { type: 'auszahlung', user: 'Anna Schmidt', amount: 50, date: new Date() },
    { type: 'einzahlung', user: 'Tom Weber', amount: 200, date: new Date() }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserData(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (!user) {
          this.router.navigate(['/login']);
        }
      });
    
    // Alle User laden (für Dropdown)
    this.allUsers = this.authService.getAllUsers().filter(u => u.username !== 'admin');
    this.stats.totalSparer = this.allUsers.length;
    this.stats.aktiveSparer = this.allUsers.filter(u => u.username !== '***').length;
  }

  private loadStats(): void {
    // Hier würden echte Daten geladen
    // Momentan Demo-Daten
  }

  onSparerSelect(sparer: User): void {
    this.selectedSparer = sparer;
    console.log('Sparer ausgewählt:', sparer.username);
  }

  goToSparerDashboard(): void {
    if (this.selectedSparer) {
      this.router.navigate(['/sparer', this.selectedSparer.id]);
    }
  }

  onAddSparer(): void {
    this.router.navigate(['/register']);
  }

  onAddTransaction(): void {
    // TODO: Transaction Form öffnen
    console.log('Add Transaction');
  }

  onExportData(): void {
    // TODO: Export Funktionalität
    console.log('Export Data');
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  getUserDisplayName(user: User): string {
    return `${user.username} (${this.getRoleLabel(user.role)})`;
  }

  private getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'Admin';
      case 'kassenwart': return 'Kassenwart';
      case 'user': return 'Sparer';
      default: return role;
    }
  }
}