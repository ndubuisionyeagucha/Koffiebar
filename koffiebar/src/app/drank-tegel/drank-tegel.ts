import { Component, input, output } from '@angular/core';
import { Drank} from '../dranken';
import { Badge } from '../components/badge/badge';

@Component({
  imports: [Badge],
  selector: 'app-drank-tegel',
  styleUrl: './drank-tegel.css',
  templateUrl: './drank-tegel.html',
})
export class DrankTegel {
  drank = input.required<Drank>();
  besteld = output<Drank>();
}
