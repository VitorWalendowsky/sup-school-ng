import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPessoas } from './lista-pessoas';

describe('ListaPessoas', () => {
  let component: ListaPessoas;
  let fixture: ComponentFixture<ListaPessoas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPessoas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPessoas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
