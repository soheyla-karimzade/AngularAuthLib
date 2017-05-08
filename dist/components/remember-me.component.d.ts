import { OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
export declare class RememberMeComponent implements OnInit {
    private fb;
    constructor(fb: FormBuilder);
    user: FormGroup;
    ngOnInit(): void;
}
