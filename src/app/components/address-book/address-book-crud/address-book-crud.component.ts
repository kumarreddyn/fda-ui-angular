import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-book-crud',
  templateUrl: './address-book-crud.component.html',
  styleUrls: ['./address-book-crud.component.scss']
})
export class AddressBookCrudComponent implements OnInit {

  displayAddPage: boolean;
  displayUpdatePage: boolean;
  displayDeletePage: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
