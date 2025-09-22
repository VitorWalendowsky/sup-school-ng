import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraRetangulo } from './calculadora-retangulo';

describe('CalculadoraRetangulo', () => {
  let component: CalculadoraRetangulo;
  let fixture: ComponentFixture<CalculadoraRetangulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraRetangulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraRetangulo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
