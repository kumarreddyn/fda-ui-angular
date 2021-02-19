import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodItemsComponent } from './search-food-items.component';

describe('SearchFoodItemsComponent', () => {
  let component: SearchFoodItemsComponent;
  let fixture: ComponentFixture<SearchFoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFoodItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
