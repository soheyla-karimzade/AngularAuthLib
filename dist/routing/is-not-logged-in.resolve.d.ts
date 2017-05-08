import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
export declare class IsNotLoggedInResolve implements Resolve<any> {
    protected auth: AuthService;
    private router;
    constructor(auth: AuthService, router: Router);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any;
}
