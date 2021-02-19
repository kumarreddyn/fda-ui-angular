import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOutletCrudComponent } from './food-outlet-crud.component';

describe('FoodOutletCrudComponent', () => {
  let component: FoodOutletCrudComponent;
  let fixture: ComponentFixture<FoodOutletCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodOutletCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodOutletCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
