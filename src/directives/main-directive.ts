import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Tempalte} from "../models/template";

@Directive({
    selector: '[urlServer]',
})
export class MainDirective implements OnInit{


    constructor(private authService:AuthService) { }
    @Input('urlServer') url: string;
    @Input() rememberMe:boolean;
    @Input() template:Tempalte;
    @Input() login:string;
    @Input() forgotPassword:string;
    ngOnInit(): void {
        this.authService.setApiUrl('http://localhost:'+this.url);
        this.authService.setRememberme(this.rememberMe);
        this.authService.setForgotPassword(this.forgotPassword);
        for (let index in this.template) // for acts as a foreach
        {
            // console.log(this.template[index].name,this.template[index].tempalte);
            if(this.template[index].name=='login'){
                this.login=this.template[index].tempalte;
            }
        }

    }
}
