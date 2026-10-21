import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aditzak } from './aditzak';

describe('Aditzak', () => {
  let component: Aditzak;
  let fixture: ComponentFixture<Aditzak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aditzak],
    }).compileComponents();

    fixture = TestBed.createComponent(Aditzak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
