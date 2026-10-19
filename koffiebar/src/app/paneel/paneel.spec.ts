import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paneel } from './paneel';

describe('Paneel', () => {
  let component: Paneel;
  let fixture: ComponentFixture<Paneel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paneel],
    }).compileComponents();

    fixture = TestBed.createComponent(Paneel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
