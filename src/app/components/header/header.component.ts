import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Cart } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  displaySideNavSubject = false;
  cart: Cart;

  constructor(private commonService: CommonService, private authService: AuthService,
    private translateService: TranslateService, public dialog: MatDialog,
    private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.subscribeAuthSubject().subscribe(result => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });

    this.orderService.subscribeCartSubject().subscribe(result => {
      this.cart = result;
    });
  }

  getPhotoURL(): string{
    
      return '';
    
  }

  onToolbarMenuToggle(): void {
    this.displaySideNavSubject = !this.displaySideNavSubject;
    this.commonService.publishDisplaySideNavSubject(this.displaySideNavSubject);
  }

  changeLanguage(lang: string){
    this.translateService.setDefaultLang(lang);
  }

  displayRegisterPopup(){
    const loginDialogRef = this.dialog.open(AuthDialogComponent, {
       width: '400px',
      id: 'authDialog'
    });
    loginDialogRef.componentInstance.tabIndex = 1;
  }

  displayLoginPopup(){
    const loginDialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
     id: 'authDialog'
   });
   loginDialogRef.componentInstance.tabIndex = 0;
  }

  logout(): void{
    localStorage.clear();
    this.authService.publishAuthSubject('logged-out');
    this.router.navigate(['home']);
  }

}
