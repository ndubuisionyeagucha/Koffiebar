import { Component, input } from '@angular/core';

type Color = "groen" | "grijs" | "rood";

@Component({
  imports: [],
  selector: 'app-badge',
  styleUrl: './badge.css',
  templateUrl: './badge.html',
})
export class Badge {
  label = input.required<string>();

  kleur = input<Color>('grijs')
}
