import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemCrudComponent } from './food-item-crud.component';

describe('FoodItemCrudComponent', () => {
  let component: FoodItemCrudComponent;
  let fixture: ComponentFixture<FoodItemCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
