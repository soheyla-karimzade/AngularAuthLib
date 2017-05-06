import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Login} from "../models/Login";
import { ToasterService} from 'angular2-toaster';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    template : '<section id="wrapper" class="login-register"> <div class="login-box"> ' +
    '<div class="white-box"> ' +
    '<form (ngSubmit)="resetPassword.valid && sendResetPasswordRequest()" #resetPassword="ngForm" novalidate class="form-horizontal form-material" id="resetPasswordForm" > ' +
    '<div class="form-group"> <div class="col-xs-12"> <h3>reset password</h3> </div> </div>' +
    ' <div class="form-group " [ngClass]="{\'has-error\': password.invalid && password.dirty }">' +
        '<div class="col-xs-12"> <input class="form-control" type="password" name="password" [(ngModel)]="newPassword"   validateEqual="passwordConfirm"  reverse="true" required placeholder="reset password" #password="ngModel"> ' +
    '</div> </div> ' +
    '<div class="form-group" [ngClass]="{\'has-error\': passwordConfirm.invalid && passwordConfirm.dirty}">' +
        '<div class="col-xs-12"> ' +
        '<input class="form-control" type="password"  validateEqual="password"  name="passwordConfirm" [(ngModel)]="newPasswordConfirm"  #passwordConfirm="ngModel"  required placeholder="confirm password">' +
        '</div> </div>' +
    ' <div class="form-group text-center m-t-20"> ' +
    '<div class="col-xs-12"> ' +
    '<button class="btn btn-primary btn-lg btn-block text-uppercase" [disabled]="resetPassword.invalid" type="submit">update password</button> ' +
    '</div> </div> </form> <div> ' +
    '<a routerLink="/login"><i class="fa fa-lock m-r-5"></i>back to login</a> ' +
    '</div> </div> </div> </section>',
    providers: [AuthService]
})

export  class ResetPasswordComponent  implements OnInit{

    private newPassword:string;
    private newPasswordConfirm:string;
    private key:string;

    constructor(private authService:AuthService,private router:Router,private toaster:ToasterService,private route:ActivatedRoute){
        this.newPassword="";
        this.newPasswordConfirm="";
    }

    ngOnInit(): void {
        this.route.params.subscribe(params=>{
            this.key=params["resetPasswordKey"];
        })
    }

    sendResetPasswordRequest(){
        this.authService.updateUserPassword(this.key,this.newPassword).subscribe(res=>{
                this.toaster.pop("success","change password","your password changed successfully");
                return this.router.navigateByUrl("/login");
        });
    }

}