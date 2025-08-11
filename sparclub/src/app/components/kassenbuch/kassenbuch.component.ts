import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-kassenbuch',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './kassenbuch.component.html',
  styleUrls: ['./kassenbuch.component.scss']
})
export class KassenbuchComponent implements OnInit {
  loading = true;
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  
  monate = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onMonthChange(month: number): void {
    this.selectedMonth = month;
    console.log('Monat geändert:', this.monate[month]);
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    console.log('Jahr geändert:', year);
  }

  onExportData(): void {
    console.log('Daten exportieren');
    // TODO: Export functionality
  }

  onImportData(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      console.log('Datei importieren:', input.files[0].name);

    }
  }
}