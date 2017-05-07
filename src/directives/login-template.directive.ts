import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
@Directive({selector: 'myItemm'})
export class LoginTemplate {
    @Input() html: string;
    constructor(private element: ElementRef) {
        this.html= element.nativeElement.innerHTML
    }
}