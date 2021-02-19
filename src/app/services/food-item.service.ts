import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  save(foodItem: any, photo: File): any {
    let formData = new FormData();
    formData.append("foodItem", JSON.stringify(foodItem.value));
    if(null !== photo){
      formData.append("photo", photo, photo.name);
    }
    return this.http.post(environment.apiUrl + '/catalogue-service/food-item/save',
            formData, {headers: this.commonService.getEmptyHeaders()});
  }

  update(foodItem: any, photo: File): any {
    let formData = new FormData();
    formData.append("foodItem", JSON.stringify(foodItem.value));
    if(null !== photo){
      formData.append("photo", photo, photo.name);
    }
    return this.http.post(environment.apiUrl + '/catalogue-service/food-item/update',
            formData, {headers: this.commonService.getEmptyHeaders()});
  }

  delete(foodItem: any): any {
    return this.http.post(environment.apiUrl + '/catalogue-service/food-item/delete',
        JSON.stringify(foodItem.value), {headers: this.commonService.getJSONHeaders()});
  }

  getAllFoodItems(foodOutletId: number): any {
    return this.http.get(environment.apiUrl + '/catalogue-service/food-item/'+foodOutletId+'/get-all-food-items');
  }

  searchFoodItems(foodOutletId: number): any {
    return this.http.get(environment.apiUrl + '/open-api-service/'+foodOutletId+'/get-all-food-items');
  }

}
