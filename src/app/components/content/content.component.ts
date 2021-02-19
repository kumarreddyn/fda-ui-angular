import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  isLoggedIn: boolean = false;
  displaySideNavSubject: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isMenuOpen = true;
  sideNavWidth = '50px';

  constructor(private breakpointObserver: BreakpointObserver,
      private commonService: CommonService, private authService: AuthService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.authService.isLoggedIn();
    this.commonService.subscribeDisplaySideNavSubject().subscribe(result => {
      this.displaySideNavSubject = result;
      if (!this.displaySideNavSubject) {
        this.sideNavWidth = '50px';
      } else {
        this.sideNavWidth = '160px';
      }
    });

    this.authService.subscribeAuthSubject().subscribe(result => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });

  }

  hasRole(role: string): boolean{
    return true;
  }

}
