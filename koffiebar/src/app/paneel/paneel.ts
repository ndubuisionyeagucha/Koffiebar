import { Component, input } from '@angular/core';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  imports: [ɵEmptyOutletComponent],
  selector: 'app-paneel',
  styleUrl: './paneel.css',
  templateUrl: './paneel.html',
})
export class Paneel {
  titel = input.required<string>();
}
