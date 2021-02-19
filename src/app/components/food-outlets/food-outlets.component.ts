import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { FoodOutlet } from 'src/app/models/food-outlet.model';
import { CommonService } from 'src/app/services/common.service';
import { FoodOutletService } from 'src/app/services/food-outlet.service';
import { FoodOutletCrudComponent } from './food-outlet-crud/food-outlet-crud.component';

@Component({
  selector: 'app-food-outlets',
  templateUrl: './food-outlets.component.html',
  styleUrls: ['./food-outlets.component.scss']
})
export class FoodOutletsComponent implements OnInit {

  dataSource:  MatTableDataSource<any>;
  displayedColumns: string[] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  outletPhotoURL  = '/../assets/images/outlet_default_icon.png';

  constructor(private router: Router, private foodOutletService: FoodOutletService,
    private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns = ['photoURL', 'name', 'location', 'description', 'actions'];
    this.foodOutletService.getAllFoodOutlets().subscribe(result => {
      const apiResponse = result as APIResponse;
      if(apiResponse.code === RestServiceConstants.FOOD_OUTLETS_FOUND){
        const data = apiResponse.data as any;
        this.dataSource = new MatTableDataSource(data.foodOutlets);
        this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }
      }
    });
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayAddPage(){
    const dialogRef = this.dialog.open(FoodOutletCrudComponent, {
      width: '500px',
      id: 'food-outlet-crud'
      });
      dialogRef.componentInstance.displayAddPage = true;
      dialogRef.afterClosed().subscribe(result => {
        if (result.code === RestServiceConstants.FOOD_OUTLET_SAVED) {
          const data = this.dataSource.data;
          data.unshift(result.foodOutlet);
          this.dataSource.data = data;
        }
      });
  }

  displayUpdatePage(index: number, foodOutlet: FoodOutlet){
    const dialogRef = this.dialog.open(FoodOutletCrudComponent, {
        width: '500px',
        id: 'food-outlet-crud',
        data: { index: index, foodOutlet: foodOutlet }
    });
    dialogRef.componentInstance.displayUpdatePage = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result.code === RestServiceConstants.FOOD_OUTLET_UPDATED) {
        const data = this.dataSource.data;
        data[result.index] = result.foodOutlet;
        this.dataSource.data = data;
      }
    });

  }

  displayDeletePage(index: number, foodOutlet: FoodOutlet){
    const dialogRef = this.dialog.open(FoodOutletCrudComponent, {
      width: '500px',
      id: 'food-outlet-crud',
      data: { index: index, foodOutlet: foodOutlet }
    });
    dialogRef.componentInstance.displayDeletePage = true;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result.code === RestServiceConstants.FOOD_OUTLET_DELETED) {
        const data = this.dataSource.data;
        data.splice(result.index, 1);
        this.dataSource.data = data;
      }
    });
  }

  generateEncodedFileURI(fileURL): string{
    if(fileURL !== null && fileURL !== undefined && fileURL !== ''){
      return this.commonService.generateEncodedFileURI(fileURL);
    }else{
      return this.outletPhotoURL;
    }
  }

  goToFoodItems(foodOutlet: FoodOutlet): void{
    this.foodOutletService.setSelectedFoodOutlet(foodOutlet);
    this.router.navigate(['/food-items']);
  }

}
