import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraTemperaturaComponent } from './calculadora-temperatura.component';

describe('CalculadoraTemperaturaComponent', () => {
  let component: CalculadoraTemperaturaComponent;
  let fixture: ComponentFixture<CalculadoraTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraTemperaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
