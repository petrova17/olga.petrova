"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AddDriverVacancyComponent = /** @class */ (function () {
    function AddDriverVacancyComponent() {
    }
    __decorate([
        core_1.Input()
    ], AddDriverVacancyComponent.prototype, "vacancy", void 0);
    __decorate([
        core_1.Input()
    ], AddDriverVacancyComponent.prototype, "addVacancyForm", void 0);
    AddDriverVacancyComponent = __decorate([
        core_1.Component({
            selector: 'app-add-driver-vacancy',
            templateUrl: './add-driver-vacancy.component.html'
        })
    ], AddDriverVacancyComponent);
    return AddDriverVacancyComponent;
}());
exports.AddDriverVacancyComponent = AddDriverVacancyComponent;
//# sourceMappingURL=add-driver-vacancy.component.js.map