import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-filterbalk',
  styleUrl: './filterbalk.css',
  templateUrl: './filterbalk.html',
})
export class Filterbalk {
  keuze = model.required<string>();
}
