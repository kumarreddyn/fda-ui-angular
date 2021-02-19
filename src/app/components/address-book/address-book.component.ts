import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { AddressBookCrudComponent } from './address-book-crud/address-book-crud.component';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {

  dataSource:  MatTableDataSource<any>;
  displayedColumns: string[] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private userService: UserService,
    private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns = ['photoURL', 'name', 'location', 'description', 'actions'];
    // this.foodOutletService.getAllFoodOutlets().subscribe(result => {
    //   const apiResponse = result as APIResponse;
    //   if(apiResponse.code === RestServiceConstants.FOOD_OUTLETS_FOUND){
    //     const data = apiResponse.data as any;
    //     this.dataSource = new MatTableDataSource(data.foodOutlets);
    //     this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.filterPredicate = (data: any, filter) => {
    //       const dataStr =JSON.stringify(data).toLowerCase();
    //       return dataStr.indexOf(filter) != -1;
    //     }
    //   }
    // });
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayAddPage(){
    const dialogRef = this.dialog.open(AddressBookCrudComponent, {
      width: '500px',
      id: 'address-crud'
      });
      dialogRef.componentInstance.displayAddPage = true;
      dialogRef.afterClosed().subscribe(result => {
        if (result.code === RestServiceConstants.ADDRESS_SAVED) {
          const data = this.dataSource.data;
          data.unshift(result.foodOutlet);
          this.dataSource.data = data;
        }
      });
  }

  displayUpdatePage(index: number, address: Address){
    const dialogRef = this.dialog.open(AddressBookCrudComponent, {
        width: '500px',
        id: 'address-crud',
        data: { index: index, address: address }
    });
    dialogRef.componentInstance.displayUpdatePage = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result.code === RestServiceConstants.ADDRESS_UPDATED) {
        const data = this.dataSource.data;
        data[result.index] = result.foodOutlet;
        this.dataSource.data = data;
      }
    });

  }

  displayDeletePage(index: number, address: Address){
    const dialogRef = this.dialog.open(AddressBookCrudComponent, {
      width: '500px',
      id: 'address-crud',
      data: { index: index, address: address }
    });
    dialogRef.componentInstance.displayDeletePage = true;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result.code === RestServiceConstants.ADDRESS_DELETED) {
        const data = this.dataSource.data;
        data.splice(result.index, 1);
        this.dataSource.data = data;
      }
    });
  }

  generateEncodedFileURI(fileURL): string{
    if(fileURL !== null && fileURL !== undefined && fileURL !== ''){
      return this.commonService.generateEncodedFileURI(fileURL);
    }
    return '';
  }

}
