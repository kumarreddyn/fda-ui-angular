import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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

}
