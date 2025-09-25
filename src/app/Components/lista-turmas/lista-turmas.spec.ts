import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurmas } from './lista-turmas';

describe('ListaTurmas', () => {
  let component: ListaTurmas;
  let fixture: ComponentFixture<ListaTurmas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTurmas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTurmas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
