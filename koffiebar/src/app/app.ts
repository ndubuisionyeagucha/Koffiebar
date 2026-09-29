import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hoofding } from './hoofding/hoofding';
import { Drankkaart } from './drankkaart/drankkaart';
import { Voettekst } from './voettekst/voettekst';
import { Bestelknop } from './bestelknop/bestelknop';

@Component({
  imports: [RouterOutlet, Hoofding, Drankkaart, Voettekst, Bestelknop],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('koffiebar');
}
