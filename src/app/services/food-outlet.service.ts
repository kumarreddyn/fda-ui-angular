import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodOutlet } from '../models/food-outlet.model';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FoodOutletService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setSelectedFoodOutlet(foodOutlet: FoodOutlet): void{
    localStorage.setItem('selectedFoodOutlet', JSON.stringify(foodOutlet));
  }

  getSelectedFoodOutlet(): FoodOutlet{
    const value =  localStorage.getItem('selectedFoodOutlet');
    if(value !== null && value !== undefined){
      const selectedFoodOutlet = JSON.parse(value);
      return selectedFoodOutlet;
    }else{
      return null;
    }
  }

  save(foodOutlet: any, photo: File): any {
    let formData = new FormData();
    formData.append("foodOutlet", JSON.stringify(foodOutlet.value));
    if(null !== photo){
      formData.append("photo", photo, photo.name);
    }
    return this.http.post(environment.apiUrl + '/catalogue-service/food-outlet/save',
            formData, {headers: this.commonService.getEmptyHeaders()});
  }

  update(foodOutlet: any, photo: File): any {
    let formData = new FormData();
    formData.append("foodOutlet", JSON.stringify(foodOutlet.value));
    if(null !== photo){
      formData.append("photo", photo, photo.name);
    }
    return this.http.post(environment.apiUrl + '/catalogue-service/food-outlet/update',
            formData, {headers: this.commonService.getEmptyHeaders()});
  }

  delete(foodOutlet: any): any {
    return this.http.post(environment.apiUrl + '/catalogue-service/food-outlet/delete',
        JSON.stringify(foodOutlet.value), {headers: this.commonService.getJSONHeaders()});
  }

  getAllFoodOutlets(): any {
    return this.http.get(environment.apiUrl + '/catalogue-service/food-outlet/get-all-food-outlets');
  }

  searchFoodOutlets(): any {
    return this.http.get(environment.apiUrl + '/open-api-service/get-all-food-outlets');
  }

}
