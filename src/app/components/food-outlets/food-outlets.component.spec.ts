import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOutletsComponent } from './food-outlets.component';

describe('FoodOutletsComponent', () => {
  let component: FoodOutletsComponent;
  let fixture: ComponentFixture<FoodOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodOutletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
