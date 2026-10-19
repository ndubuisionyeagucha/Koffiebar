import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Hoofding } from './hoofding/hoofding';
import { Drankkaart } from './drankkaart/drankkaart';
import { Voettekst } from './voettekst/voettekst';
import { Bestelknop } from './bestelknop/bestelknop';
import { Bestellijn } from './bestellijn';
import { Drank } from './dranken';
import { Badge } from './components/badge/badge';
import { Bonnetje } from './bonnetje/bonnetje';
import { Filterbalk } from './filterbalk/filterbalk';
import { DRANKEN } from './dranken';
import { Paneel } from './paneel/paneel';
import { Dagschotel } from './dagschotel/dagschotel';

@Component({
  imports: [RouterOutlet, Hoofding, Drankkaart, Voettekst, Bestelknop, Badge, Bonnetje, FormsModule, Filterbalk, Paneel, Dagschotel],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('koffiebar');
  bestelling = signal<Bestellijn[]>([]);
  aantalDrankjes = computed(() =>
    this.bestelling().reduce((som, lijn) => som + lijn.aantal, 0));
  bestel(drank: Drank) {
    console.log("De kassa heeft de bestelling ontvangen:", drank.naam)
    const bestaatAl = this.bestelling().some(l => l.drank.id === drank.id);

    if (bestaatAl) {
      this.bestelling.update(lijst =>
          lijst.map(l => l.drank.id === drank.id ? { ...l, aantal: l.aantal + 1} :l)
      );
    } else {
      this.bestelling.update(lijst => [...lijst, { drank: drank, aantal: 1}]);
    }
  }

  zoekterm = signal('');
  gekozenCategorie = signal('alle');
  zichtbaar = computed(() => {
    return DRANKEN.filter(drank => {
      const pastBijCategorie = this.gekozenCategorie() === 'alle' || drank.categorie === this.gekozenCategorie();
      const pastBijZoekterm = drank.naam.toLowerCase().includes(this.zoekterm().toLowerCase());
      return pastBijCategorie && pastBijZoekterm;
    })
  })
}
