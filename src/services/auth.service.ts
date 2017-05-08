import {Injectable} from "@angular/core";
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Login} from "../models/Login";
import {User} from "../models/User";
import {Config} from "../config";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router} from "@angular/router";
@Injectable()
export class AuthService{
    constructor(private http:Http,private router:Router){ }

    login(data:Login,event):Observable<any> {
        let headers = new Headers();
        headers.append("Authorization", 'Basic ' + btoa(data.email + ':' + data.password));
        headers.append("Content-type", "application/json");
        headers.append('Access-Control-Allow-Origin',"*");
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        headers.append('Access-Control-Allow-Headers','X-Requested-With');
        console.log( this.http.post( "http://localhost:8000/auth/user/login",JSON.stringify({rememberMe: true}), {"headers": headers}));
        return this.http.post( "http://localhost:8000/api/user/login",JSON.stringify({rememberMe: true}), {"headers": headers});
    }


    requestForgotPassword(email:string):Observable<any>{
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        return this.http.post(this.getApiUrl() + "api/user/forgot-password", {"email": email}, {
            "headers": headers
        });
    }

    updateUserPassword(key:string,newPassword:string):Observable<any>{
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        return this.http.patch(this.getApiUrl() + "api/user/reset-password", JSON.stringify({
            "key":key,
            password: newPassword
        }), {
            "headers": headers
        });
    }

    public  addCookies(user:User, token:string,rememberMe:boolean){
            if(rememberMe){
                Cookie.set("token",token,15,"/");
                Cookie.set("email",user.email,15,"/");
                Cookie.set("remember",rememberMe?"1":"0",15,"/");
            }
            else{
                Cookie.set("token",token,0,"/");
                Cookie.set("email",user.email,0,"/");
                Cookie.set("remember",rememberMe?"1":"0",0,"/");
            }
    }

    public  isLoggedIn():boolean{
        return Cookie.get("token")!==null;
    }

    public canActivate() {
        if (this.isLoggedIn) { return true; }
        this.router.navigate(['/login']);
        return false;
    }


    public  setApiUrl(apiUrl){
        let apiConfig = new Config();
        apiConfig.apiUrl = apiUrl;
        Cookie.set("ApiUrl",apiConfig.apiUrl);
    }

    public  getApiUrl(){
        return Cookie.get("ApiUrl") ;
    }
    public  setRememberme(rememberMe){
        Cookie.set("rememberMe",rememberMe);
    }
    public  getRememberme(){
        return Cookie.get("rememberMe");
    }


    public  setForgotPassword(forgotPassword){
        Cookie.set("forgotPassword",forgotPassword);
    }
    public  getForgotPassword(){
        return Cookie.get("forgotPassword");
    }


}