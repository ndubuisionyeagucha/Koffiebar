import { Component, input, computed } from '@angular/core';
import { Bestellijn } from '../bestellijn';

@Component({
  imports: [],
  selector: 'app-bonnetje',
  styleUrl: './bonnetje.css',
  templateUrl: './bonnetje.html',
})
export class Bonnetje {
  lijnen = input.required<Bestellijn[]>()
  subtotaal = computed(() => {
    return this.lijnen().reduce((som, lijn) => som + (lijn.aantal * lijn.drank.prijs), 0)
  });

  fooi = computed(() => {
    if (this.subtotaal() >= 5) {
      return this.subtotaal() * 0.10;
    } else {
      return 0;
    }
  });

  totaal = computed(() => {
    return this.subtotaal() + this.fooi()
  })
}
