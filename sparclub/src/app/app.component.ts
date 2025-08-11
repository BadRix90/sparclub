import { Component } from '@angular/core';
import { KassenbuchComponent } from './components/kassenbuch/kassenbuch.component';

@Component({
  selector: 'app-root',
  imports: [KassenbuchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sparclub Kassenbuch';
}