import {Component, OnInit,Input,Injector} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Login} from "../models/Login";
import {User} from "../models/User";
import { ToasterService} from 'angular2-toaster';


@Component({
    selector: 'login',
    template:'<dynamic-component [componentData]="componentData"></dynamic-component>{{name}}<toaster-container ></toaster-container><div class="container"><div class="col-md-5">' +
    '<form novalidate (ngSubmit)="onSubmit(user.value,user.valid,$event);$event.stopPropagation()" [formGroup]="user">' +
    '<div class="form-group"  [ngClass]="{\'has-error\': user.get(\'email\').invalid}">' +
        '<label class="center-block">user Name: <input class="form-control" formControlName="email"' +
    '  placeholder="User Name"  > ' +
'</label></div> <div class="form-group"   [ngClass]="{\'has-error\': user.get(\'password\').invalid}">'+
    '<label class="center-block">password:' +
    '<input type="password" class="form-control"  formControlName="password" placeholder="password"> ' +
    '</label></div><div class="checkbox"> <label class="center-block"> <input type="checkbox" formControlName="rememberMe" >Remember Me? ' +
    '</label></div><button type="submit"  class="btn btn-default" [disabled]="user.invalid">Sign up</button> <div>' +
    ' <a routerLink="/forgot-password"><i class="fa fa-lock m-r-5"></i>forgot password</a> </div> </form> </div></div>',
    providers: [AuthService],
    styleUrls: [ "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"]
})



export  class LoginComponent  implements OnInit{
   // @Input() name: string;
    tempUrl=null;
    private login:Login[];
    user: FormGroup;
    constructor(private authService:AuthService,private fb: FormBuilder,private toaster:ToasterService,private injector: Injector) {
        this.tempUrl = this.injector.get('tempUrl');
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
    }
}

