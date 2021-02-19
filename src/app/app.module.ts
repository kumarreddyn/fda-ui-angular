import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SearchFoodOutletsComponent } from './components/search-food-outlets/search-food-outlets.component';
import { FoodOutletsComponent } from './components/food-outlets/food-outlets.component';
import { FoodOutletCrudComponent } from './components/food-outlets/food-outlet-crud/food-outlet-crud.component';
import { FoodItemsComponent } from './components/food-items/food-items.component';
import { FoodItemCrudComponent } from './components/food-items/food-item-crud/food-item-crud.component';
import { SearchFoodItemsComponent } from './components/search-food-items/search-food-items.component';
import { AuthDialogComponent } from './components/header/auth-dialog/auth-dialog.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { AddressBookCrudComponent } from './components/address-book/address-book-crud/address-book-crud.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SearchFoodOutletsComponent,
    FoodOutletsComponent,
    FoodOutletCrudComponent,
    FoodItemsComponent,
    FoodItemCrudComponent,
    SearchFoodItemsComponent,
    AuthDialogComponent,
    ModalComponent,
    AddressBookComponent,
    AddressBookCrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
