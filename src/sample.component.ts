import {Component, Input, OnInit} from '@angular/core';
import {Config} from  './config'
import {LoginComponent} from "./login/login.component";
@Component({
  selector: 'auth  [myInput] = "anotherVariable"',
  template: ' <toaster-container ></toaster-container><div class="container"><router-outlet></router-outlet></div>',
})

export class SampleComponent implements OnInit{
  @Input() myInput: String;
  componentData = null;
  ngOnInit(): void {
    if(this.myInput=='1'){
      this.componentData = {
        component: LoginComponent,
        inputs: {
          tempUrl: this.myInput
        }
      };
    }

  }

  constructor() {
  }

}
