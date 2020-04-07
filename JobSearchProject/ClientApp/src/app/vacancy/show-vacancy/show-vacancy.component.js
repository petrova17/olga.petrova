"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enum_1 = require("../../models/enum");
var driverVacancy_1 = require("../../models/driverVacancy");
var trackerError_1 = require("../../models/trackerError");
var ShowVacancyComponent = /** @class */ (function () {
    function ShowVacancyComponent(route, dataService, router) {
        this.route = route;
        this.dataService = dataService;
        this.router = router;
        this.EmploymentType = enum_1.EmploymentType;
        this.PaymentType = enum_1.PaymentType;
        this.EducationType = enum_1.EducationType;
        this.trackerError = new trackerError_1.TrackerError();
        this.selectedVacancy = new driverVacancy_1.DriverVacancy();
    }
    ShowVacancyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var vacancyId = parseInt(this.route.snapshot.params['id']);
        this.dataService.getDriverVacancy(vacancyId)
            .subscribe(function (data) {
            _this.displayDriverVacancy(data);
        }, function (err) {
            _this.trackerError.friendlyMessage = err.friendlyMessage;
        }, function () { return console.log("All done"); });
    };
    ShowVacancyComponent.prototype.displayDriverVacancy = function (vacancy) {
        this.selectedVacancy = vacancy;
    };
    ShowVacancyComponent.prototype.onBack = function () {
        this.router.navigate(['']);
    };
    ShowVacancyComponent = __decorate([
        core_1.Component({
            selector: 'show-add-vacancy',
            templateUrl: './show-vacancy.component.html'
        })
    ], ShowVacancyComponent);
    return ShowVacancyComponent;
}());
exports.ShowVacancyComponent = ShowVacancyComponent;
//# sourceMappingURL=show-vacancy.component.js.map