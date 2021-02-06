import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  isLoggedIn: boolean = true;
  displaySideNavSubject: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isMenuOpen = true;
  sideNavWidth = '50px';

  constructor(private breakpointObserver: BreakpointObserver,
      private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.subscribeDisplaySideNavSubject().subscribe(result => {
      this.displaySideNavSubject = result;
      if (!this.displaySideNavSubject) {
        this.sideNavWidth = '50px';
      } else {
        this.sideNavWidth = '160px';
      }
    });

  }

  hasRole(role: string): boolean{
    return true;
  }

}
