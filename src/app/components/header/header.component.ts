import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;
  displaySideNavSubject = true;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  getPhotoURL(): string{
    
      return '';
    
  }

  onToolbarMenuToggle(): void {
    this.displaySideNavSubject = !this.displaySideNavSubject;
    this.commonService.publishDisplaySideNavSubject(this.displaySideNavSubject);
  }


}
