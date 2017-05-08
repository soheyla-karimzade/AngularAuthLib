import { OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Login } from "../models/Login";
import { ToasterService } from 'angular2-toaster';
import { LoginTempalte } from "../components/login-template.component";
export declare class LoginComponent implements OnInit {
    private authService;
    private fb;
    private toaster;
    private login;
    private rememeberMe;
    private forgotPassword;
    user: FormGroup;
    loginTemplate: LoginTempalte;
    constructor(authService: AuthService, fb: FormBuilder, toaster: ToasterService);
    onSubmit(model: Login, isValid: boolean, event: any): void;
    ngOnInit(): void;
}
