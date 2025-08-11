import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kassenbuch',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <div class="container">
      <h1>Sparclub Kassenbuch</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>Übersicht</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Gesamtguthaben: {{ gesamtguthaben }}€</p>
          <p>Anzahl Sparer: {{ anzahlSparer }}</p>
        </mat-card-content>
      </mat-card>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="neueEinzahlung()">
          <mat-icon>add</mat-icon>
          Einzahlung
        </button>
        <button mat-raised-button color="warn" (click)="neueAuszahlung()">
          <mat-icon>remove</mat-icon>
          Auszahlung
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
  `]
})
export class KassenbuchComponent {
  gesamtguthaben = 1500;
  anzahlSparer = 5;

  neueEinzahlung() {
    console.log('Einzahlung clicked');
  }

  neueAuszahlung() {
    console.log('Auszahlung clicked');
  }
}