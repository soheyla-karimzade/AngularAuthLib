

import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class IsNotLoggedInResolve implements Resolve<any>{
    constructor(protected auth:AuthService,private router:Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
        if(this.auth.isLoggedIn()){
            this.router.navigateByUrl("/");
        }
        return !this.auth.isLoggedIn();
    }

}