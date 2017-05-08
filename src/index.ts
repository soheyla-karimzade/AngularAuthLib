import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { SampleService } from './sample.service';
import {LoginComponent} from "./login/login.component";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ToasterModule} from 'angular2-toaster';
import { CustomFormsModule } from 'ng2-validation'
import {ForgotPasswordComponent} from "./login/forgot-password.component";
import {RouterModule} from "@angular/router";
import {EqualValidator} from "./directives/equal-validator.directive";
import {ResetPasswordComponent} from "./login/reset-password.component";
import {IsNotLoggedInResolve} from "./routing/is-not-logged-in.resolve";
import {AppRoutes} from "./AppRoutes";
import {AuthService} from "./services/auth.service";
import {MainDirective} from "./directives/main-directive";
import {RememberMeComponent} from "./components/remember-me.component";
import {LoadTemplate} from "./directives/load-template.directive";
import {LoginTempalte} from "./components/login-template.component";


export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './sample.service';


// export function createAppModule(test) {
  @NgModule({
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
  })
  export class SampleModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SampleModule,
        providers: [SampleService],
      };
    }

  }
// }