"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var core_1 = require("@angular/core");
var sample_service_1 = require("../sample.service");
var index_1 = require("../index");
var TestComponent_1 = require("./TestComponent");
__export(require("../sample.component"));
__export(require("../sample.directive"));
__export(require("../sample.pipe"));
__export(require("../sample.service"));
var TestModule = TestModule_1 = (function () {
    function TestModule() {
    }
    TestModule.forRoot = function () {
        return {
            ngModule: TestModule_1,
            providers: [sample_service_1.SampleService]
        };
    };
    return TestModule;
}());
TestModule = TestModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            index_1.SampleModule,
        ],
        declarations: [
            TestComponent_1.TestComponent,
        ],
        exports: [
            TestComponent_1.TestComponent,
        ],
        providers: [],
        bootstrap: [TestComponent_1.TestComponent]
    })
], TestModule);
exports.TestModule = TestModule;
var TestModule_1;
