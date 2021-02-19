import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodOutletCrudComponent } from './components/food-outlets/food-outlet-crud/food-outlet-crud.component';
import { FoodOutletsComponent } from './components/food-outlets/food-outlets.component';
import { MainComponent } from './components/main/main.component';
import { FoodItemsComponent } from './components/food-items/food-items.component';
import { FoodItemCrudComponent } from './components/food-items/food-item-crud/food-item-crud.component';
import { SearchFoodOutletsComponent } from './components/search-food-outlets/search-food-outlets.component';
import { SearchFoodItemsComponent } from './components/search-food-items/search-food-items.component';

const routes: Routes = [
  { path: 'home', component:  SearchFoodOutletsComponent},
  { path: 'search-food-items', component:  SearchFoodItemsComponent},
  { path: 'food-outlets',
    children:[
      { path: '', component:  FoodOutletsComponent},
      { path: 'add', component:  FoodOutletCrudComponent},
      { path: 'update', component:  FoodOutletCrudComponent},
      { path: 'delete', component:  FoodOutletCrudComponent}
    ]
  },
  { path: 'food-items',
      children:[
        { path: '', component:  FoodItemsComponent},
        { path: 'add', component:  FoodItemCrudComponent},
        { path: 'update', component:  FoodItemCrudComponent},
        { path: 'delete', component:  FoodItemCrudComponent}
      ]
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**',   redirectTo: '/error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
