import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
import { ToasterService} from 'angular2-toaster';
import {Router} from "@angular/router";

@Component({
    template : '<div class="col-md-5">' +
    '<form class="form-horizontal" (ngSubmit)="forgotPasswordForm.valid && submitForgotPassword()" #forgotPasswordForm="ngForm" novalidate> ' +
    '<div class="form-group">' +
    '<div class="col-xs-12">' +
    '<p class="text-muted">forgot password</p>' +
    '</div></div><div class="form-group" [ngClass]="{\'has-error\': emailModel.invalid && emailModel.dirty }">' +
        '<div class="col-xs-12">' +
    '<input class="form-control" type="email" name="email"  [(ngModel)]="email" #emailModel="ngModel" required pattern="" placeholder="email">' +
'</div></div><div class="form-group text-center m-t-20">' +
    '<div class="col-xs-12"><button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" [disabled]="forgotPasswordForm.invalid" type="submit">send ' +
    '</button></div></div></form><div>' +
    '<a routerLink="/login"><i class="fa fa-lock m-r-5"></i>go to login</a></div></div>',
    providers: [AuthService]
})

export  class ForgotPasswordComponent {
    private email:string;
    constructor(private authService:AuthService,private router:Router,private toaster:ToasterService){
        this.email="";
    }
    submitForgotPassword(){
        this.authService.requestForgotPassword(this.email).subscribe(response=>{
            console.log(response.body);
            this.toaster.pop("success",null,"reset password email sent successfully");
            this.router.navigateByUrl("/login");
        });
    }
}