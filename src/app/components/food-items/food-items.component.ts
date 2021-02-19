import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { FoodItem } from 'src/app/models/food-item.model';
import { FoodOutlet } from 'src/app/models/food-outlet.model';
import { CommonService } from 'src/app/services/common.service';
import { FoodItemService } from 'src/app/services/food-item.service';
import { FoodOutletService } from 'src/app/services/food-outlet.service';
import { FoodItemCrudComponent } from './food-item-crud/food-item-crud.component';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.scss']
})
export class FoodItemsComponent implements OnInit {

  dataSource:  MatTableDataSource<any>;
  displayedColumns: string[] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  selectedFoodOutlet: FoodOutlet;
  itemPhotoURL  = '/../assets/images/item_default_icon.png';

  constructor(private router: Router, private foodOutletService: FoodOutletService,
    private foodItemService: FoodItemService,
    private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.selectedFoodOutlet = this.foodOutletService.getSelectedFoodOutlet();
    if(this.selectedFoodOutlet === null || this.selectedFoodOutlet === undefined){
      this.router.navigate(['/food-outlets']);
    }else{
      this.displayedColumns = ['photoURL', 'name', 'description', 'price', 'actions'];
      this.foodItemService.getAllFoodItems(this.selectedFoodOutlet.foodOutletId).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_ITEMS_FOUND){
          const data = apiResponse.data as any;
          this.dataSource = new MatTableDataSource(data.foodItems);
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

  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayAddPage(){
    const dialogRef = this.dialog.open(FoodItemCrudComponent, {
        width: '500px',
        id: 'food-outlet-crud',
        data: { foodOutletId: this.selectedFoodOutlet.foodOutletId }
      });
      dialogRef.componentInstance.displayAddPage = true;
      dialogRef.afterClosed().subscribe(result => {
        if (result.code === RestServiceConstants.FOOD_ITEM_SAVED) {
          const data = this.dataSource.data;
          data.unshift(result.foodItem);
          this.dataSource.data = data;
        }
      });
  }

  displayUpdatePage(index: number, foodItem: FoodItem ){
    const dialogRef = this.dialog.open(FoodItemCrudComponent, {
        width: '500px',
        id: 'food-outlet-crud',
        data: { index: index, foodItem: foodItem }
    });
    dialogRef.componentInstance.displayUpdatePage = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result.code === RestServiceConstants.FOOD_ITEM_UPDATED) {
        const data = this.dataSource.data;
        data[result.index] = result.foodItem;
        this.dataSource.data = data;
      }
    });

  }

  displayDeletePage(index: number, foodItem: FoodItem){
    const dialogRef = this.dialog.open(FoodItemCrudComponent, {
      width: '500px',
      id: 'food-outlet-crud',
      data: { index: index, foodItem: foodItem }
    });
    dialogRef.componentInstance.displayDeletePage = true;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result.code === RestServiceConstants.FOOD_ITEM_DELETED) {
        const data = this.dataSource.data;
        data.splice(result.index, 1);
        this.dataSource.data = data;
      }
    });
  }

  generateEncodedFileURI(fileURL): string{
    if(fileURL !== null && fileURL !== undefined && fileURL !== ''){
      console.log(this.commonService.generateEncodedFileURI(fileURL));
      return this.commonService.generateEncodedFileURI(fileURL);
    }else{
      return this.itemPhotoURL;
    }
  }

}
