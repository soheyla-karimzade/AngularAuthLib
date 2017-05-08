import { OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
export declare class ResetPasswordComponent implements OnInit {
    private authService;
    private router;
    private toaster;
    private route;
    private newPassword;
    private newPasswordConfirm;
    private key;
    constructor(authService: AuthService, router: Router, toaster: ToasterService, route: ActivatedRoute);
    ngOnInit(): void;
    sendResetPasswordRequest(): void;
}
