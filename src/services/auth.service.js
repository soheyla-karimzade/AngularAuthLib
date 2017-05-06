"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var config_1 = require("../config");
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (data, event) {
        var headers = new http_1.Headers();
        headers.append("Authorization", 'Basic ' + btoa(data.email + ':' + data.password));
        headers.append("Content-type", "application/json");
        headers.append('Access-Control-Allow-Origin', "*");
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
        console.log(this.http.post(config_1.Config.apiUrl + "api/user/login", JSON.stringify({ rememberMe: true }), { "headers": headers }));
        // return this.http.post(Config.apiUrl + "api/user/login",JSON.stringify({rememberMe: true}), {"headers": headers});
        return this.http.post(config_1.Config.apiUrl + "api/user/login", JSON.stringify({ rememberMe: true }), { "headers": headers });
    };
    AuthService.prototype.requestForgotPassword = function (email) {
        var headers = new http_1.Headers();
        headers.append("Content-type", "application/json");
        return this.http.post(config_1.Config.apiUrl + "api/user/forgot-password", { "email": email }, {
            "headers": headers
        }).map(function (response) {
            return response;
        });
    };
    AuthService.prototype.updateUserPassword = function (key, newPassword) {
        var headers = new http_1.Headers();
        headers.append("Content-type", "application/json");
        return this.http.patch(config_1.Config.apiUrl + "api/user/reset-password", JSON.stringify({
            "key": key,
            password: newPassword
        }), {
            "headers": headers
        }).map(function (res) {
            return res.json();
        });
    };
    AuthService.prototype.addCookies = function (user, token, rememberMe) {
        if (rememberMe) {
            ng2_cookies_1.Cookie.set("token", token, 15, "/");
            ng2_cookies_1.Cookie.set("email", user.email, 15, "/");
            ng2_cookies_1.Cookie.set("remember", rememberMe ? "1" : "0", 15, "/");
        }
        else {
            ng2_cookies_1.Cookie.set("token", token, 0, "/");
            ng2_cookies_1.Cookie.set("email", user.email, 0, "/");
            ng2_cookies_1.Cookie.set("remember", rememberMe ? "1" : "0", 0, "/");
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
