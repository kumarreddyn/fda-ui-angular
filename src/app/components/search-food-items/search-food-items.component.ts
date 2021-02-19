import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalConstants } from 'src/app/constants/modal.constants';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { Cart } from 'src/app/models/cart.model';
import { FoodItem } from 'src/app/models/food-item.model';
import { FoodOutlet } from 'src/app/models/food-outlet.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { CommonService } from 'src/app/services/common.service';
import { FoodItemService } from 'src/app/services/food-item.service';
import { FoodOutletService } from 'src/app/services/food-outlet.service';
import { ModalService } from 'src/app/services/modal.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-search-food-items',
  templateUrl: './search-food-items.component.html',
  styleUrls: ['./search-food-items.component.scss']
})
export class SearchFoodItemsComponent implements OnInit {

  dataSource:  MatTableDataSource<any>;
  displayedColumns: string[] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  selectedFoodOutlet: FoodOutlet;
  itemPhotoURL  = '/../assets/images/item_default_icon.png';

  cart: Cart;

  constructor(private router: Router, private foodOutletService: FoodOutletService,
    private foodItemService: FoodItemService, private orderService: OrderService,
    private commonService: CommonService, private modalService: ModalService) { }

  ngOnInit(): void {

    this.selectedFoodOutlet = this.foodOutletService.getSelectedFoodOutlet();
    if(this.selectedFoodOutlet === null || this.selectedFoodOutlet === undefined){
      this.router.navigate(['/home']);
    }else{
      this.displayedColumns = ['photoURL', 'name', 'description', 'price', 'actions'];
      this.foodItemService.searchFoodItems(this.selectedFoodOutlet.foodOutletId).subscribe(result => {
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

    this.orderService.subscribeCartSubject().subscribe(result => {
      console.log(JSON.stringify(result));
      this.cart = result;
    });
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generateEncodedFileURI(fileURL): string{
    if(fileURL !== null && fileURL !== undefined && fileURL !== ''){
      console.log(this.commonService.generateEncodedFileURI(fileURL));
      return this.commonService.generateEncodedFileURI(fileURL);
    }else{
      return this.itemPhotoURL;
    }
  }

  getCartItem(foodItem: FoodItem): OrderItem {
    let orderItem = new OrderItem();
    if(this.cart !== null && this.cart !== undefined){
      for(let i=0; i<this.cart.orderItems.length;i++){
        if(this.cart.orderItems[i].foodItemId === foodItem.foodItemId){
          return this.cart.orderItems[i];
        }
      }
    }
    return orderItem;
  }

  addToCart(index: number, foodItem: FoodItem, quantity: number): void{

    if(this.selectedFoodOutlet.foodOutletId !== foodItem.foodOutletId){
      let messages = {};
      let dialogRef = this.modalService.displayModal(ModalConstants.CONFIRM_MODAL, messages);
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined && result.code === ModalConstants.CONFIRM_YES) {
          this.orderService.clearCart();
          this.cart = null;
          let cart = this.getCart();
          this.updateCart(cart, foodItem, quantity);
        }
      });
    } else{
      let cart = this.getCart();
      this.updateCart(cart, foodItem, quantity);
    }

  }

  getCart(): Cart{
    let cart = null;
    let orderItems = [];
    if(this.cart === null || this.cart === undefined){
      cart = new Cart();
      cart.foodOutletId = this.selectedFoodOutlet.foodOutletId;
      cart.foodOutletName = this.selectedFoodOutlet.name;      
      cart.orderItems = orderItems;
    }else{
      cart = this.cart as Cart;
    }
    return cart;
  }

  updateCart(cart: Cart, foodItem: FoodItem, quantity: number){
    let itemIndex = cart.orderItems.findIndex(x => x.foodItemId === foodItem.foodItemId);
    if(itemIndex === -1){
      let newOrderItem = new OrderItem;
      newOrderItem.foodItemId = foodItem.foodItemId;
      newOrderItem.foodItemName = foodItem.name;
      newOrderItem.price = foodItem.price;
      newOrderItem.quantity = quantity;
      let price = foodItem.price * quantity;
      newOrderItem.totalPrice = price;
      cart.totalItems += quantity;
      cart.totalPrice += price;
      cart.orderItems.push(newOrderItem);
    }else{
      let existingOrderItem = cart.orderItems[itemIndex];
      if(existingOrderItem.quantity - quantity >= 0){
        existingOrderItem.quantity += quantity;
        let price = foodItem.price * quantity;
        existingOrderItem.totalPrice += price;
        cart.orderItems[itemIndex] = existingOrderItem;
        cart.totalItems += quantity;
        cart.totalPrice += price;
      }
    }
    this.cart = cart;
    this.orderService.publishCartSubject(cart);
  }

}
