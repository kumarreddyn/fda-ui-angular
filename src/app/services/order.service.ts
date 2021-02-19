import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cartSubject = new BehaviorSubject<Cart>(null);

  constructor() { }

  publishCartSubject(cart: Cart): void {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  subscribeCartSubject(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  loadCart(): void{
    let cartFromStorage = this.getCart();
    this.publishCartSubject(cartFromStorage);
  }

  getCart(): Cart{
    let cartFromStorage = localStorage.getItem('cart');
    if(null !== cartFromStorage){
      let cart = JSON.parse(localStorage.getItem('cartFromStorage')) as Cart;
      return cart;
    }
    return null;
  }

  clearCart(): void{
    localStorage.removeItem('cart');
    this.publishCartSubject(null);
  }

}
