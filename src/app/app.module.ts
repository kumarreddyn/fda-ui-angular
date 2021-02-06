import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { SearchFoodOutletsComponent } from './components/search-food-outlets/search-food-outlets.component';
import { SearchFoodOutletItemsComponent } from './components/search-food-outlet-items/search-food-outlet-items.component';
import { FoodOutletsComponent } from './components/food-outlets/food-outlets.component';
import { FoodOutletItemsComponent } from './components/food-outlets/food-outlet-items/food-outlet-items.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SearchFoodOutletsComponent,
    SearchFoodOutletItemsComponent,
    FoodOutletsComponent,
    FoodOutletItemsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
