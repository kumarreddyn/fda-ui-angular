import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { FoodOutlet } from 'src/app/models/food-outlet.model';
import { CommonService } from 'src/app/services/common.service';
import { FoodOutletService } from 'src/app/services/food-outlet.service';

@Component({
  selector: 'app-food-outlet-crud',
  templateUrl: './food-outlet-crud.component.html',
  styleUrls: ['./food-outlet-crud.component.scss']
})
export class FoodOutletCrudComponent implements OnInit {

  addFoodOutletForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    description : new FormControl(''),
    location : new FormControl('', [Validators.required])
  });

  updateFoodOutletForm = new FormGroup({
    foodOutletId : new FormControl(''),
    name : new FormControl('', [Validators.required]),
    description : new FormControl(''),
    location : new FormControl('', [Validators.required])
  });

  deleteFoodOutletForm = new FormGroup({
    foodOutletId : new FormControl('')
  });

  outletPhoto: File = null;
  outletPhotoURL  = '/../assets/images/outlet_default_icon.png';

  displayAddPage: boolean;
  displayUpdatePage: boolean;
  displayDeletePage: boolean;

  constructor(private router: Router, private foodOutletService: FoodOutletService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<FoodOutletCrudComponent>) { }

  ngOnInit(): void {
    if(this.dialogData.foodOutlet  !== null && this.dialogData.foodOutlet !== undefined){
      this.updateFoodOutletForm.patchValue(this.dialogData.foodOutlet);
      this.deleteFoodOutletForm.patchValue(this.dialogData.foodOutlet);
      this.outletPhotoURL = this.getEncodedOutletPhotoURI(this.dialogData.foodOutlet.photoURL);
    }
  }

  photoInputChange(event: any): void{
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.outletPhotoURL = URL.createObjectURL(event.target.files[0]);
      this.outletPhoto = event.target.files[0] as File;
    }
  }

  save(){
    if(this.addFoodOutletForm.valid){
      this.foodOutletService.save(this.addFoodOutletForm, this.outletPhoto).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_OUTLET_SAVED){
          const data = apiResponse.data as any;
          this.dialogRef.close({ foodOutlet: data.foodOutlet, code: apiResponse.code });
        }
      });
    }  
  }

  update(){
    if(this.updateFoodOutletForm.valid){
      this.foodOutletService.update(this.updateFoodOutletForm, this.outletPhoto).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_OUTLET_UPDATED){
          const data = apiResponse.data as any;
          this.dialogRef.close({ foodOutlet: data.foodOutlet, code: apiResponse.code, index: this.dialogData.index });
        }
      });
    }
  }

  delete(){
    if(this.deleteFoodOutletForm.valid){
      this.foodOutletService.delete(this.deleteFoodOutletForm).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.FOOD_OUTLET_DELETED){
          const data = apiResponse.data as any;
          this.dialogRef.close({ code: apiResponse.code });
        }
      });
    }
  }

  close(){
    this.dialogRef.close();
  }

  getEncodedOutletPhotoURI(photoURL: string): string{
    if(photoURL !== null && photoURL !== undefined && photoURL !== ''){
      return this.generateEncodedFileURI(photoURL);
    }
    return this.outletPhotoURL;
  }

  generateEncodedFileURI(fileURL): string{
    return this.commonService.generateEncodedFileURI(fileURL);
  }

}
