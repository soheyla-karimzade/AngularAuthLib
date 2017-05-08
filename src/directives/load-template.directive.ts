import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Tempalte} from "../models/template";
@Directive({selector: 'template'})
export class LoadTemplate {
    @Input() templatel:Tempalte;
    @Input() login:string;
    constructor(private element: ElementRef) {
        for (let index in this.templatel) // for acts as a foreach
        {
            // console.log(this.template[index].name,this.template[index].tempalte);
            if(this.templatel[index].name=='login'){
                this.login=this.templatel[index].tempalte;
            }
        }
    }
}