import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { FoodOutlet } from 'src/app/models/food-outlet.model';
import { CommonService } from 'src/app/services/common.service';
import { FoodOutletService } from 'src/app/services/food-outlet.service';

@Component({
  selector: 'app-search-food-outlets',
  templateUrl: './search-food-outlets.component.html',
  styleUrls: ['./search-food-outlets.component.scss']
})
export class SearchFoodOutletsComponent implements OnInit {

  foodOutlets: FoodOutlet[] = [];
  cols: number;
  gridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 4,
    sm: 3,
    xs: 2
  };

  constructor(private foodOutletService: FoodOutletService,
    private commonService: CommonService, private router: Router,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.foodOutletService.getAllFoodOutlets().subscribe(result => {
      const apiResponse = result as APIResponse;
      if(apiResponse.code === RestServiceConstants.FOOD_OUTLETS_FOUND){
        const data = apiResponse.data as any;
        this.foodOutlets = data.foodOutlets as FoodOutlet[];
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    
  }

  generateEncodedFileURI(fileURL): string{
    return this.commonService.generateEncodedFileURI(fileURL);
  }

  displayFoodItems(foodOutlet: FoodOutlet): void{
    this.foodOutletService.setSelectedFoodOutlet(foodOutlet);
    this.router.navigate(['/search-food-items']);
  }

}
