import { NgModule, ModuleWithProviders } from '@angular/core';
import { SampleService } from '../sample.service';
import {SampleModule} from "../index";
import {TestComponent} from "./TestComponent";

export * from '../sample.component';
export * from '../sample.directive';
export * from '../sample.pipe';
export * from '../sample.service';

@NgModule({
    imports: [
        SampleModule,
    ],
    declarations: [
        TestComponent,
    ],
    exports: [
        TestComponent,
    ],
    providers: [],
    bootstrap: [TestComponent]
})
export class TestModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TestModule,
            providers: [SampleService]
        };
    }
}
