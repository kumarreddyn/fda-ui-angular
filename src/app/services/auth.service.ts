import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new Subject<any>();

  constructor(private http: HttpClient, private commonService: CommonService) { }

  publishAuthSubject(message: string): void {
    this.authSubject.next({ text: message });
  }

  subscribeAuthSubject(): Observable<any> {
    return this.authSubject.asObservable();
  }

  getAuthTokenData(): any{
    const X_AUTH_TOKEN = localStorage.getItem('X_AUTH_TOKEN');
    if (X_AUTH_TOKEN !== null){
      const tokenData = JSON.parse(atob(X_AUTH_TOKEN.split('.')[1]));
      return tokenData;
    }else{
      return null;
    }
  }

  setAuthTokenData(authToken: string){
    if(authToken !== null && authToken !== undefined && authToken !== ''){
      localStorage.setItem('X_AUTH_TOKEN', authToken);
    }
  }

  isLoggedIn(): boolean{
    const TOKEN_DATA = this.getAuthTokenData();
    if (TOKEN_DATA !== null && TOKEN_DATA !== undefined){
      let expiry = TOKEN_DATA.exp;
      let currentDate = new Date();
      let expiryDate = new Date(0);
      expiryDate.setUTCSeconds(expiry);
      if(currentDate < expiryDate){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  register(userForm: any): any {
    let formData = new FormData();
    formData.append("user", JSON.stringify(userForm.value));
    return this.http.post(environment.apiUrl + '/open-api-service/register',
            formData, {headers: this.commonService.getEmptyHeaders()});
  }

  login(loginForm: any): any {
    let formData = new FormData();
    formData.append("login", JSON.stringify(loginForm.value));
    return this.http.post(environment.apiUrl + '/open-api-service/login',
            formData, {headers: this.commonService.getEmptyHeaders()});
  }


}
