import { AuthService } from "../services/auth.service";
import { ToasterService } from 'angular2-toaster';
import { Router } from "@angular/router";
export declare class ForgotPasswordComponent {
    private authService;
    private router;
    private toaster;
    private email;
    constructor(authService: AuthService, router: Router, toaster: ToasterService);
    submitForgotPassword(): void;
}
