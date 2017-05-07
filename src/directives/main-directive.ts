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
    ngOnInit(): void {
        this.authService.setApiUrl('http://localhost:'+this.url);
        this.authService.setRememberme(this.rememberMe);
        console.log(typeof  this.authService.getRememberme(),this.rememberMe)
    }
}
