import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
@Component({
    selector: 'rememberMe',
    template:'<div class="checkbox"> <label class="center-block"> ' +
    '<input type="checkbox" formControlName="rememberMe" >Remember Me? ' +
    '</label></div>'
})

export class RememberMeComponent implements OnInit{
    constructor(private fb: FormBuilder,) {
    }
    user: FormGroup;
    ngOnInit() {
        this.user = this.fb.group({
            rememberMe: ''
        });
    }
}