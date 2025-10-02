import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraRetanguloComponent } from './calculadora-retangulo.component';

describe('CalculadoraRetanguloComponent', () => {
  let component: CalculadoraRetanguloComponent;
  let fixture: ComponentFixture<CalculadoraRetanguloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraRetanguloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraRetanguloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
