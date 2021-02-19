import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RestServiceConstants } from 'src/app/constants/rest-service.constants';
import { APIResponse } from 'src/app/models/api-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  tabIndex = 0;

  registerForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    emailAddress : new FormControl('', [Validators.required, Validators.email]),
    countryCode : new FormControl(''),
    mobileNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    password : new FormControl('',  [Validators.required, Validators.pattern('^(?=.{6,})(?=.*[@#$%^&+=]).*$')]),
    confirmPassword : new FormControl('', [Validators.required])
  }, {
    validators: this.password.bind(this)
  });

  loginForm = new FormGroup({
    mobileNumber : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, public dialog: MatDialog,
    private snackBar: MatSnackBar,private router: Router,
    private translateService: TranslateService, private commonService: CommonService) {}

  ngOnInit(): void {
  }

  password(formGroup: FormGroup): boolean {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');

    const matched: boolean =  password === confirmPassword ;
    if (matched) {
      formGroup.controls.confirmPassword.setErrors(null);
    } else {
      formGroup.controls.confirmPassword.setErrors({
          passwordNotMatch: true
        });
    }

    return matched;
  }

  register(): void{

    if (this.registerForm.valid){
     
      this.authService.register(this.registerForm).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.USER_SAVED){
            this.registerForm.reset();
            let message = 'User registered';
            this.translateService.get('messages.userRegistered').subscribe((res: string) => {
              message = res;
            });
            this.commonService.displaySnackBarMessages(message, 3000);
            const signupDialog = this.dialog.getDialogById('authDialog');
            signupDialog.componentInstance.tabIndex = 0;
        }else{
            let message = 'User registered';
            this.translateService.get('messages.userNotRegistered').subscribe((res: string) => {
              message = res;
            });
            this.commonService.displaySnackBarMessages(message, 3000);
        }
      });
    }else{
        let message = 'Invalid registration form';
        this.translateService.get('messages.invalidRegistrationForm').subscribe((res: string) => {
          message = res;
        });
        this.commonService.displaySnackBarMessages(message, 3000);
    }

  }

  login(): void{
    if (this.loginForm.valid){
      this.authService.login(this.loginForm).subscribe(result => {
        const apiResponse = result as APIResponse;
        if(apiResponse.code === RestServiceConstants.USER_LOGGED_IN){
          const data = apiResponse.data as any;
          localStorage.setItem('X_AUTH_TOKEN', data.X_AUTH_TOKEN);
          this.authService.publishAuthSubject('logged-in');
          this.dialog.getDialogById('authDialog').close();
        }else{
          let message = 'Invalid login';
          this.translateService.get('messages.invalidLogin').subscribe((res: string) => {
            message = res;
          });
          this.commonService.displaySnackBarMessages(message, 3000);
        }
      });
    }
  }

}
