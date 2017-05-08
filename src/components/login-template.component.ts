import {Component, Input} from "@angular/core";
@Component({
    selector: 'login-template',
    template:''
})

export class LoginTempalte {
    constructor() {}
    @Input() content:string;
    getContent(){
        return this.content;
    }
}
