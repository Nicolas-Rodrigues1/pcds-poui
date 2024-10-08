import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendasComponent } from './listar-vendas.component';

describe('ListarVendasComponent', () => {
  let component: ListarVendasComponent;
  let fixture: ComponentFixture<ListarVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarVendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
