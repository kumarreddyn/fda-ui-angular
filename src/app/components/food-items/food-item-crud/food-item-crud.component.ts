import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { CommonService } from 'src/app/services/common.service';
import { FoodItemService } from 'src/app/services/food-item.service';

@Component({
  selector: 'app-food-item-crud',
  templateUrl: './food-item-crud.component.html',
  styleUrls: ['./food-item-crud.component.scss']
})
export class FoodItemCrudComponent implements OnInit {

  addFoodItemForm = new FormGroup({
    foodOutletId : new FormControl(''),
    name : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    price : new FormControl('', [Validators.required])
  });

  updateFoodItemForm = new FormGroup({
    foodOutletId : new FormControl(''),
    foodItemId : new FormControl(''),
    name : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    price : new FormControl('', [Validators.required])
  });

  deleteFoodItemForm = new FormGroup({
    foodItemId : new FormControl(''),
  });

  itemPhoto: File = null;
  itemPhotoURL  = '/../assets/images/item_default_icon.png';

  displayAddPage: boolean;
  displayUpdatePage: boolean;
  displayDeletePage: boolean;

  constructor(private router: Router, private foodItemService: FoodItemService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<FoodItemCrudComponent>) { }

  ngOnInit(): void {
    if(this.dialogData.foodOutletId  !== null && this.dialogData.foodOutletId !== undefined){
      this.addFoodItemForm.get('foodOutletId').setValue(this.dialogData.foodOutletId);
    }
    if(this.dialogData.foodItem  !== null && this.dialogData.foodItem !== undefined){
      this.updateFoodItemForm.patchValue(this.dialogData.foodItem);
      this.deleteFoodItemForm.patchValue(this.dialogData.foodItem);
      this.itemPhotoURL = this.getEncodeditemPhotoURI(this.dialogData.foodItem.photoURL);
    }
  }

  photoInputChange(event: any): void{
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.itemPhotoURL = URL.createObjectURL(event.target.files[0]);
      this.itemPhoto = event.target.files[0] as File;
    }
  }

  save(){
    if(this.addFoodItemForm.valid){
      this.foodItemService.save(this.addFoodItemForm, this.itemPhoto).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_ITEM_SAVED){
          const data = apiResponse.data as any;
          this.dialogRef.close({ foodItem: data.foodItem, code: apiResponse.code });
        }
      });
    }  
  }

  update(){
    if(this.updateFoodItemForm.valid){
      this.foodItemService.update(this.updateFoodItemForm, this.itemPhoto).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_ITEM_UPDATED){
          const data = apiResponse.data as any;
          this.dialogRef.close({ foodItem: data.foodItem, code: apiResponse.code, index: this.dialogData.index });
        }
      });
    }
  }

  delete(){
    if(this.deleteFoodItemForm.valid){
      this.foodItemService.delete(this.deleteFoodItemForm).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_ITEM_DELETED){
          const data = apiResponse.data as any;
          this.dialogRef.close({ code: apiResponse.code });
        }
      });
    }
  }

  close(){
    this.dialogRef.close();
  }

  getEncodeditemPhotoURI(photoURL: string): string{
    if(photoURL !== null && photoURL !== undefined && photoURL !== ''){
      return this.generateEncodedFileURI(photoURL);
    }
    return this.itemPhotoURL;
  }

  generateEncodedFileURI(fileURL): string{
    return this.commonService.generateEncodedFileURI(fileURL);
  }

}
