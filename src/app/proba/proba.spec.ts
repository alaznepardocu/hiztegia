import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Proba } from './proba';

describe('Proba', () => {
  let component: Proba;
  let fixture: ComponentFixture<Proba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proba],
    }).compileComponents();

    fixture = TestBed.createComponent(Proba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
