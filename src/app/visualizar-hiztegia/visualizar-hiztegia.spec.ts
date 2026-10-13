import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarHiztegia } from './visualizar-hiztegia';

describe('VisualizarHiztegia', () => {
  let component: VisualizarHiztegia;
  let fixture: ComponentFixture<VisualizarHiztegia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarHiztegia],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarHiztegia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
