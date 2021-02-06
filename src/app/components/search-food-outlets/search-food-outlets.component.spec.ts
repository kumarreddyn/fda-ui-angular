import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodOutletsComponent } from './search-food-outlets.component';

describe('SearchFoodOutletsComponent', () => {
  let component: SearchFoodOutletsComponent;
  let fixture: ComponentFixture<SearchFoodOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFoodOutletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
