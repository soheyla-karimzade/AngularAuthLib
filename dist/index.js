import { Attribute, Component, Directive, ElementRef, Injectable, Input, NgModule, Pipe, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, NG_VALIDATORS, ReactiveFormsModule, Validators } from '@angular/forms';
import { Headers, Http, HttpModule } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CustomFormsModule } from 'ng2-validation';

var SampleComponent = (function () {
    function SampleComponent() {
    }
    return SampleComponent;
}());
SampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'auth',
                template: '<toaster-container ></toaster-container><div class="container"><router-outlet></router-outlet></div>',
            },] },
];
/**
 * @nocollapse
 */
SampleComponent.ctorParameters = function () { return []; };

var SampleDirective = (function () {
    /**
     * @param {?} el
     */
    function SampleDirective(el) {
        this.el = el;
    }
    return SampleDirective;
}());
SampleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sampleDirective]'
            },] },
];
/**
 * @nocollapse
 */
SampleDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };

/**
 * Transforms any input value
 */
var SamplePipe = (function () {
    function SamplePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    SamplePipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value;
    };
    return SamplePipe;
}());
SamplePipe.decorators = [
    { type: Pipe, args: [{
                name: 'samplePipe'
            },] },
    { type: Injectable },
];
/**
 * @nocollapse
 */
SamplePipe.ctorParameters = function () { return []; };

var SampleService = (function () {
    function SampleService() {
    }
    return SampleService;
}());
SampleService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
SampleService.ctorParameters = function () { return []; };

var Config = (function () {
    function Config() {
    }
    return Config;
}());

var AuthService = (function () {
    /**
     * @param {?} http
     * @param {?} router
     */
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
    }
    /**
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    AuthService.prototype.login = function (data, event) {
        var /** @type {?} */ headers = new Headers();
        headers.append("Authorization", 'Basic ' + btoa(data.email + ':' + data.password));
        headers.append("Content-type", "application/json");
        headers.append('Access-Control-Allow-Origin', "*");
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
        console.log(this.http.post("http://localhost:8000/auth/user/login", JSON.stringify({ rememberMe: true }), { "headers": headers }));
        return this.http.post("http://localhost:8000/api/user/login", JSON.stringify({ rememberMe: true }), { "headers": headers });
    };
    /**
     * @param {?} email
     * @return {?}
     */
    AuthService.prototype.requestForgotPassword = function (email) {
        var /** @type {?} */ headers = new Headers();
        headers.append("Content-type", "application/json");
        return this.http.post(this.getApiUrl() + "api/user/forgot-password", { "email": email }, {
            "headers": headers
        });
    };
    /**
     * @param {?} key
     * @param {?} newPassword
     * @return {?}
     */
    AuthService.prototype.updateUserPassword = function (key, newPassword) {
        var /** @type {?} */ headers = new Headers();
        headers.append("Content-type", "application/json");
        return this.http.patch(this.getApiUrl() + "api/user/reset-password", JSON.stringify({
            "key": key,
            password: newPassword
        }), {
            "headers": headers
        });
    };
    /**
     * @param {?} user
     * @param {?} token
     * @param {?} rememberMe
     * @return {?}
     */
    AuthService.prototype.addCookies = function (user, token, rememberMe) {
        if (rememberMe) {
            Cookie.set("token", token, 15, "/");
            Cookie.set("email", user.email, 15, "/");
            Cookie.set("remember", rememberMe ? "1" : "0", 15, "/");
        }
        else {
            Cookie.set("token", token, 0, "/");
            Cookie.set("email", user.email, 0, "/");
            Cookie.set("remember", rememberMe ? "1" : "0", 0, "/");
        }
    };
    /**
     * @return {?}
     */
    AuthService.prototype.isLoggedIn = function () {
        return Cookie.get("token") !== null;
    };
    /**
     * @return {?}
     */
    AuthService.prototype.canActivate = function () {
        if (this.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    /**
     * @param {?} apiUrl
     * @return {?}
     */
    AuthService.prototype.setApiUrl = function (apiUrl) {
        var /** @type {?} */ apiConfig = new Config();
        apiConfig.apiUrl = apiUrl;
        Cookie.set("ApiUrl", apiConfig.apiUrl);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getApiUrl = function () {
        return Cookie.get("ApiUrl");
    };
    /**
     * @param {?} rememberMe
     * @return {?}
     */
    AuthService.prototype.setRememberme = function (rememberMe) {
        Cookie.set("rememberMe", rememberMe);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getRememberme = function () {
        return Cookie.get("rememberMe");
    };
    /**
     * @param {?} forgotPassword
     * @return {?}
     */
    AuthService.prototype.setForgotPassword = function (forgotPassword) {
        Cookie.set("forgotPassword", forgotPassword);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getForgotPassword = function () {
        return Cookie.get("forgotPassword");
    };
    return AuthService;
}());
AuthService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AuthService.ctorParameters = function () { return [
    { type: Http, },
    { type: Router, },
]; };

var LoginTempalte = (function () {
    function LoginTempalte() {
    }
    /**
     * @return {?}
     */
    LoginTempalte.prototype.getContent = function () {
        return this.content;
    };
    return LoginTempalte;
}());
LoginTempalte.decorators = [
    { type: Component, args: [{
                selector: 'login-template',
                template: ''
            },] },
];
/**
 * @nocollapse
 */
LoginTempalte.ctorParameters = function () { return []; };
LoginTempalte.propDecorators = {
    'content': [{ type: Input },],
};

var LoginComponent = (function () {
    /**
     * @param {?} authService
     * @param {?} fb
     * @param {?} toaster
     */
    function LoginComponent(authService, fb, toaster) {
        this.authService = authService;
        this.fb = fb;
        this.toaster = toaster;
    }
    /**
     * @param {?} model
     * @param {?} isValid
     * @param {?} event
     * @return {?}
     */
    LoginComponent.prototype.onSubmit = function (model, isValid, event) {
        var _this = this;
        event.stopPropagation();
        console.log(model);
        this.authService.login(model, event).subscribe(function (response) {
            console.log(response);
            var /** @type {?} */ user = (response.json().user);
            var /** @type {?} */ token = response.json().token;
            _this.authService.addCookies(user, token, model.rememberMe);
            _this.toaster.pop("success", "successfull", "Login is succefully");
        });
    };
    /**
     * @return {?}
     */
    LoginComponent.prototype.ngOnInit = function () {
        this.user = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ''
        });
        if (this.authService.getRememberme() == "true") {
            this.rememeberMe = true;
        }
        else {
            this.rememeberMe = false;
        }
        if (this.authService.getForgotPassword() == "true") {
            this.forgotPassword = true;
        }
        else {
            this.forgotPassword = false;
        }
    };
    return LoginComponent;
}());
LoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'login',
                template: '<div class="container"><div class="col-md-5">' +
                    '<form novalidate (ngSubmit)="onSubmit(user.value,user.valid,$event);$event.stopPropagation()" [formGroup]="user">' +
                    '<div class="form-group"  [ngClass]="{\'has-error\': user.get(\'email\').invalid}">' +
                    '<label class="center-block">user Name: <input class="form-control" formControlName="email"' +
                    '  placeholder="User Name"  > ' +
                    '</label></div> <div class="form-group"   [ngClass]="{\'has-error\': user.get(\'password\').invalid}">' +
                    '<label class="center-block">password:' +
                    '<input type="password" class="form-control"  formControlName="password" placeholder="password"> ' +
                    '</label></div>' +
                    '<div  *ngIf="rememeberMe" class="checkbox" > <label class="center-block"> ' +
                    '<input type="checkbox" formControlName="rememberMe" >Remember Me? ' +
                    '</label></div>' +
                    '<button type="submit"  class="btn btn-default" [disabled]="user.invalid">Sign up</button> <div>' +
                    ' <a   *ngIf="forgotPassword" routerLink="/forgot-password"><i class="fa fa-lock m-r-5"></i>forgot password</a> </div> </form> </div></div>',
                providers: [AuthService],
                styleUrls: ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"]
            },] },
];
/**
 * @nocollapse
 */
LoginComponent.ctorParameters = function () { return [
    { type: AuthService, },
    { type: FormBuilder, },
    { type: ToasterService, },
]; };
LoginComponent.propDecorators = {
    'loginTemplate': [{ type: ViewChild, args: [LoginTempalte,] },],
};

var ForgotPasswordComponent = (function () {
    /**
     * @param {?} authService
     * @param {?} router
     * @param {?} toaster
     */
    function ForgotPasswordComponent(authService, router, toaster) {
        this.authService = authService;
        this.router = router;
        this.toaster = toaster;
        this.email = "";
    }
    /**
     * @return {?}
     */
    ForgotPasswordComponent.prototype.submitForgotPassword = function () {
        var _this = this;
        this.authService.requestForgotPassword(this.email).subscribe(function (response) {
            console.log(response.body);
            _this.toaster.pop("success", null, "reset password email sent successfully");
            _this.router.navigateByUrl("/login");
        });
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent.decorators = [
    { type: Component, args: [{
                template: '<div class="col-md-5">' +
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
            },] },
];
/**
 * @nocollapse
 */
ForgotPasswordComponent.ctorParameters = function () { return [
    { type: AuthService, },
    { type: Router, },
    { type: ToasterService, },
]; };

var EqualValidator = (function () {
    /**
     * @param {?} validateEqual
     * @param {?} reverse
     */
    function EqualValidator(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    Object.defineProperty(EqualValidator.prototype, "isReverse", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this.reverse)
                return false;
            return this.reverse === 'true';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} c
     * @return {?}
     */
    EqualValidator.prototype.validate = function (c) {
        // self value
        var /** @type {?} */ v = c.value;
        // control vlaue
        var /** @type {?} */ e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: false
            };
        }
        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length)
                e.setErrors(null);
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: false });
        }
        return null;
    };
    return EqualValidator;
}());
EqualValidator.decorators = [
    { type: Directive, args: [{
                selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return EqualValidator; }), multi: true }
                ]
            },] },
];
/**
 * @nocollapse
 */
EqualValidator.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Attribute, args: ['validateEqual',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['reverse',] },] },
]; };

var ResetPasswordComponent = (function () {
    /**
     * @param {?} authService
     * @param {?} router
     * @param {?} toaster
     * @param {?} route
     */
    function ResetPasswordComponent(authService, router, toaster, route) {
        this.authService = authService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.newPassword = "";
        this.newPasswordConfirm = "";
    }
    /**
     * @return {?}
     */
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.key = params["resetPasswordKey"];
        });
    };
    /**
     * @return {?}
     */
    ResetPasswordComponent.prototype.sendResetPasswordRequest = function () {
        var _this = this;
        this.authService.updateUserPassword(this.key, this.newPassword).subscribe(function (res) {
            _this.toaster.pop("success", "change password", "your password changed successfully");
            return _this.router.navigateByUrl("/login");
        });
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent.decorators = [
    { type: Component, args: [{
                template: '<section id="wrapper" class="login-register"> <div class="login-box"> ' +
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
            },] },
];
/**
 * @nocollapse
 */
ResetPasswordComponent.ctorParameters = function () { return [
    { type: AuthService, },
    { type: Router, },
    { type: ToasterService, },
    { type: ActivatedRoute, },
]; };

var IsNotLoggedInResolve = (function () {
    /**
     * @param {?} auth
     * @param {?} router
     */
    function IsNotLoggedInResolve(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    IsNotLoggedInResolve.prototype.resolve = function (route, state) {
        if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl("/");
        }
        return !this.auth.isLoggedIn();
    };
    return IsNotLoggedInResolve;
}());
IsNotLoggedInResolve.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
IsNotLoggedInResolve.ctorParameters = function () { return [
    { type: AuthService, },
    { type: Router, },
]; };

var AppRoutes = [
    {
        path: "",
        component: LoginComponent,
    },
    {
        path: "login",
        component: LoginComponent,
        resolve: {
            "notLoggedIn": IsNotLoggedInResolve
        }
    },
    {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        resolve: {
            "notLoggedIn": IsNotLoggedInResolve
        }
    },
    {
        path: 'reset-password/:resetPasswordKey',
        component: ResetPasswordComponent,
        resolve: {
            "notLoggedIn": IsNotLoggedInResolve
        }
    }
];

var MainDirective = (function () {
    /**
     * @param {?} authService
     */
    function MainDirective(authService) {
        this.authService = authService;
    }
    /**
     * @return {?}
     */
    MainDirective.prototype.ngOnInit = function () {
        this.authService.setApiUrl('http://localhost:' + this.url);
        this.authService.setRememberme(this.rememberMe);
        this.authService.setForgotPassword(this.forgotPassword);
        for (var /** @type {?} */ index in this.template) {
            // console.log(this.template[index].name,this.template[index].tempalte);
            if (this.template[index].name == 'login') {
                this.login = this.template[index].tempalte;
            }
        }
    };
    return MainDirective;
}());
MainDirective.decorators = [
    { type: Directive, args: [{
                selector: '[urlServer]',
            },] },
];
/**
 * @nocollapse
 */
MainDirective.ctorParameters = function () { return [
    { type: AuthService, },
]; };
MainDirective.propDecorators = {
    'url': [{ type: Input, args: ['urlServer',] },],
    'rememberMe': [{ type: Input },],
    'template': [{ type: Input },],
    'login': [{ type: Input },],
    'forgotPassword': [{ type: Input },],
};

var RememberMeComponent = (function () {
    /**
     * @param {?} fb
     */
    function RememberMeComponent(fb) {
        this.fb = fb;
    }
    /**
     * @return {?}
     */
    RememberMeComponent.prototype.ngOnInit = function () {
        this.user = this.fb.group({
            rememberMe: ''
        });
    };
    return RememberMeComponent;
}());
RememberMeComponent.decorators = [
    { type: Component, args: [{
                selector: 'rememberMe',
                template: '<div class="checkbox"> <label class="center-block"> ' +
                    '<input type="checkbox" formControlName="rememberMe" >Remember Me? ' +
                    '</label></div>'
            },] },
];
/**
 * @nocollapse
 */
RememberMeComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
]; };

var LoadTemplate = (function () {
    /**
     * @param {?} element
     */
    function LoadTemplate(element) {
        this.element = element;
        for (var index in this.templatel) {
            // console.log(this.template[index].name,this.template[index].tempalte);
            if (this.templatel[index].name == 'login') {
                this.login = this.templatel[index].tempalte;
            }
        }
    }
    return LoadTemplate;
}());
LoadTemplate.decorators = [
    { type: Directive, args: [{ selector: 'template' },] },
];
/**
 * @nocollapse
 */
LoadTemplate.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
LoadTemplate.propDecorators = {
    'templatel': [{ type: Input },],
    'login': [{ type: Input },],
};

var SampleModule = (function () {
    function SampleModule() {
    }
    /**
     * @return {?}
     */
    SampleModule.forRoot = function () {
        return {
            ngModule: SampleModule,
            providers: [SampleService],
        };
    };
    return SampleModule;
}());
SampleModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    HttpModule,
                    ToasterModule,
                    CustomFormsModule,
                    RouterModule.forRoot(AppRoutes)
                ],
                declarations: [
                    SampleComponent,
                    SampleDirective,
                    SamplePipe,
                    LoginComponent,
                    ForgotPasswordComponent,
                    EqualValidator,
                    ResetPasswordComponent,
                    MainDirective,
                    LoadTemplate,
                    RememberMeComponent,
                    LoginTempalte
                ],
                exports: [
                    SampleComponent,
                    SampleDirective,
                    SamplePipe,
                    LoginComponent,
                    ForgotPasswordComponent,
                    ResetPasswordComponent,
                    MainDirective,
                    RememberMeComponent,
                    LoadTemplate,
                    LoginTempalte
                ],
                providers: [CookieService, IsNotLoggedInResolve, AuthService],
                bootstrap: [SampleComponent]
            },] },
];
/**
 * @nocollapse
 */
SampleModule.ctorParameters = function () { return []; };

export { SampleModule, SampleComponent, SampleDirective, SamplePipe, SampleService };
