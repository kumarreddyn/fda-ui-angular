import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  displaySideNavSubject = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  publishDisplaySideNavSubject(display: boolean): void {
    this.displaySideNavSubject.next(display);
  }

  subscribeDisplaySideNavSubject(): Observable<boolean> {
    return this.displaySideNavSubject.asObservable();
  }

}
