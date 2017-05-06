"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../services/auth.service");
var LoginComponent = (function () {
    function LoginComponent(authService, fb, toaster) {
        this.authService = authService;
        this.fb = fb;
        this.toaster = toaster;
    }
    LoginComponent.prototype.onSubmit = function (model, isValid, event) {
        var _this = this;
        event.stopPropagation();
        console.log(model);
        this.authService.login(model, event).subscribe(function (response) {
            console.log(response);
            var user = response.json().user;
            var token = response.json().token;
            _this.authService.addCookies(user, token, model.rememberMe);
            _this.toaster.pop("success", "successfull", "Login is succefully");
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.user = this.fb.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            rememberMe: ''
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        template: '<toaster-container ></toaster-container><div class="container"><div class="col-md-5">' +
            '<form novalidate (ngSubmit)="onSubmit(user.value,user.valid,$event);$event.stopPropagation()" [formGroup]="user">' +
            '<div class="form-group"  [ngClass]="{\'has-error\': user.get(\'email\').invalid}">' +
            '<label class="center-block">user Name: <input class="form-control" formControlName="email"' +
            '  placeholder="User Name"  > ' +
            '</label></div> <div class="form-group"   [ngClass]="{\'has-error\': user.get(\'password\').invalid}">' +
            '<label class="center-block">password:' +
            '<input class="form-control"  formControlName="password" placeholder="password"> ' +
            '</label></div><div class="checkbox"> <label class="center-block"> <input type="checkbox" formControlName="rememberMe" >Remember Me? ' +
            '</label></div><button type="submit"  class="btn btn-default" [disabled]="user.invalid">Sign up</button> <div>' +
            ' <a routerLink="/forgot-password"><i class="fa fa-lock m-r-5"></i>forgot password</a> </div> </form> </div></div>',
        providers: [auth_service_1.AuthService]
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
