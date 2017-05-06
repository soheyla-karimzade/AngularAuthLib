import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {IsNotLoggedInResolve} from "./routing/is-not-logged-in.resolve";
import {ForgotPasswordComponent} from "./login/forgot-password.component";
import {ResetPasswordComponent} from "./login/reset-password.component";

export const AppRoutes: Routes = [
    {
        path:"",
        component:LoginComponent,
    },
    {
        path:"login",
        component:LoginComponent,
        resolve:{
            "notLoggedIn":IsNotLoggedInResolve
        }
    },
    {
        path:"forgot-password",
        component:ForgotPasswordComponent,
        resolve:{
            "notLoggedIn":IsNotLoggedInResolve
        }
    },
    {
        path:'reset-password/:resetPasswordKey',
        component:ResetPasswordComponent,
        resolve:{
            "notLoggedIn":IsNotLoggedInResolve
        }
    }
];