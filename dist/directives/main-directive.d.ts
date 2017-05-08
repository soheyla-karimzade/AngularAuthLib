import { OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Tempalte } from "../models/template";
export declare class MainDirective implements OnInit {
    private authService;
    constructor(authService: AuthService);
    url: string;
    rememberMe: boolean;
    template: Tempalte;
    login: string;
    forgotPassword: string;
    ngOnInit(): void;
}
