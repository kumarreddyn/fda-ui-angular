import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookCrudComponent } from './address-book-crud.component';

describe('AddressBookCrudComponent', () => {
  let component: AddressBookCrudComponent;
  let fixture: ComponentFixture<AddressBookCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressBookCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
