// dagschotel.ts - startbestand labo 3, oefening 7. Deze component bevat zes fouten uit hoofdstuk 2.
import { Component, computed, signal } from '@angular/core';
import { Badge } from '../components/badge/badge';

interface Stem {
  id: number;
  naam: string;
}

@Component({
  selector: 'app-dagschotel',
  imports: [Badge],
  templateUrl: './dagschotel.html',
  styleUrl: './dagschotel.css',
})
export class Dagschotel {
  gerecht = signal('Soep van de dag met brood');
  open = signal(true);
  stemmen = signal<Stem[]>([
    { id: 1, naam: 'Tim' },
    { id: 2, naam: 'Barbara' },
  ]);
  aantal = computed(() => this.stemmen().length);
  private volgendId = 3;

  stem(naam: string) {
    if (!naam.trim()) return;
    this.stemmen().push({ id: this.volgendId++, naam });
  }

  verwijder(id: number) {
    this.stemmen.update(lijst => lijst.filter(s => s.id !== id));
  }

  sluit() {
    this.open.set(false);
  }
}
