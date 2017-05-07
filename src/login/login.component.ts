import {Component, OnInit, Injector, QueryList, ContentChildren, ViewChild, Input} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Login} from "../models/Login";
import {User} from "../models/User";
import { ToasterService} from 'angular2-toaster';
import {LoginTemplate} from "../directives/login-template.directive";
import {RememberMeComponent}  from "../components/remember-me.component"



@Component({
    selector: 'login',
    template:
    '<div class="container"><div class="col-md-5">' +
    '<form novalidate (ngSubmit)="onSubmit(user.value,user.valid,$event);$event.stopPropagation()" [formGroup]="user">' +
    '<div class="form-group"  [ngClass]="{\'has-error\': user.get(\'email\').invalid}">' +
    '<label class="center-block">user Name: <input class="form-control" formControlName="email"' +
    '  placeholder="User Name"  > ' +
    '</label></div> <div class="form-group"   [ngClass]="{\'has-error\': user.get(\'password\').invalid}">'+
    '<label class="center-block">password:' +
    '<input type="password" class="form-control"  formControlName="password" placeholder="password"> ' +
    '</label></div>'+
    '<div  *ngIf="rememeberMe" class="checkbox" > <label class="center-block"> ' +
    '<input type="checkbox" formControlName="rememberMe" >Remember Me? ' +
    '</label></div>'+
    '<button type="submit"  class="btn btn-default" [disabled]="user.invalid">Sign up</button> <div>' +
    ' <a routerLink="/forgot-password"><i class="fa fa-lock m-r-5"></i>forgot password</a> </div> </form> </div></div>',
    providers: [AuthService],
    styleUrls: [ "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"]
})



export  class LoginComponent  implements OnInit{

    @ViewChild(RememberMeComponent) rememberMeComponent: RememberMeComponent;
    private login:Login[];
    private rememeberMe:boolean;
    @Input() template:string;
    user: FormGroup;
    constructor(private authService:AuthService,private fb: FormBuilder,private toaster:ToasterService,private injector: Injector) {
        // this.tempUrl = this.injector.get('tempUrl');
    }


    onSubmit(model: Login, isValid: boolean, event) {
        event.stopPropagation();
        console.log(model);
        this.authService.login(model,event).subscribe((response:any)=>{
            console.log(response);
            let user = <User> response.json().user;
            let token = response.json().token;
            this.authService.addCookies(user, token, model.rememberMe);
            this.toaster.pop("success", "successfull", "Login is succefully");
        });
    }

    ngOnInit() {
        this.user = this.fb.group({
            email:  ['',Validators.required],
            password: ['',Validators.required],
            rememberMe: ''
        });

        if(this.authService.getRememberme()=="true"){
            this.rememeberMe=true;
        }else{
            this.rememeberMe=false;
        }

    }
}

