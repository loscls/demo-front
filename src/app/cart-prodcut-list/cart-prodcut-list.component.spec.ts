import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProdcutListComponent } from './cart-prodcut-list.component';

describe('CartProdcutListComponent', () => {
  let component: CartProdcutListComponent;
  let fixture: ComponentFixture<CartProdcutListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartProdcutListComponent]
    });
    fixture = TestBed.createComponent(CartProdcutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
