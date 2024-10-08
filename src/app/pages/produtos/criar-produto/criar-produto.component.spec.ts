import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarProdutoComponent } from './criar-produto.component';

describe('CriarProdutoComponent', () => {
  let component: CriarProdutoComponent;
  let fixture: ComponentFixture<CriarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
