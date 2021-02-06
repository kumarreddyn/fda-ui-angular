import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOutletItemsComponent } from './food-outlet-items.component';

describe('FoodOutletItemsComponent', () => {
  let component: FoodOutletItemsComponent;
  let fixture: ComponentFixture<FoodOutletItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodOutletItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodOutletItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
