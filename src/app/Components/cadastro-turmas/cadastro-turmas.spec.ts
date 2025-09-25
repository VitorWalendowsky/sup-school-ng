import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTurmas } from './cadastro-turmas';

describe('CadastroTurmas', () => {
  let component: CadastroTurmas;
  let fixture: ComponentFixture<CadastroTurmas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTurmas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTurmas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
