import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodOutletItemsComponent } from './search-food-outlet-items.component';

describe('SearchFoodOutletItemsComponent', () => {
  let component: SearchFoodOutletItemsComponent;
  let fixture: ComponentFixture<SearchFoodOutletItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFoodOutletItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodOutletItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
