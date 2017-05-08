import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { Login } from "../models/Login";
import { User } from "../models/User";
import { Router } from "@angular/router";
export declare class AuthService {
    private http;
    private router;
    constructor(http: Http, router: Router);
    login(data: Login, event: any): Observable<any>;
    requestForgotPassword(email: string): Observable<any>;
    updateUserPassword(key: string, newPassword: string): Observable<any>;
    addCookies(user: User, token: string, rememberMe: boolean): void;
    isLoggedIn(): boolean;
    canActivate(): boolean;
    setApiUrl(apiUrl: any): void;
    getApiUrl(): string;
    setRememberme(rememberMe: any): void;
    getRememberme(): string;
    setForgotPassword(forgotPassword: any): void;
    getForgotPassword(): string;
}
