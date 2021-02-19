import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  displaySideNavSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private snackBar: MatSnackBar) { }

  publishDisplaySideNavSubject(display: boolean): void {
    this.displaySideNavSubject.next(display);
  }

  subscribeDisplaySideNavSubject(): Observable<boolean> {
    return this.displaySideNavSubject.asObservable();
  }

  getJSONHeaders(): HttpHeaders {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  getEmptyHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers;
  }

  displaySnackBarMessages(message: string, displayDuration: number): void{
    this.snackBar.open(message, '', {
      duration: displayDuration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  generateEncodedFileURI(fileURL): string{
    if (fileURL === null || fileURL === undefined || fileURL === ''){
      return '';
    }else{
      return encodeURI(environment.apiUrl + '/file-server/get-file' + fileURL);
    }
  }

}
