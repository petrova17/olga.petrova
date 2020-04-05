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
var ShowVacancyComponent = /** @class */ (function () {
    function ShowVacancyComponent(route, dataService) {
        this.route = route;
        this.dataService = dataService;
        this.selectedVacancy = {
            ageFrom: null,
            ageTo: null,
            status: null,
            contactName: null,
            drivingExperience: null,
            description: null,
            specialization: {
                specializationType: null,
                employmentType: null,
                paymentType: null,
                paymentPrice: null,
                educationType: null,
                experience: null,
                recomendation: null,
            },
            location: {
                country: null,
                city: null,
                region: null,
                street: null
            }
        };
        this.EmploymentType = enum_1.EmploymentType;
        this.PaymentType = enum_1.PaymentType;
        this.EducationType = enum_1.EducationType;
    }
    ShowVacancyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var vacancyId = parseInt(this.route.snapshot.params['id']);
        this.dataService.getDriverVacancyById(vacancyId)
            .subscribe(function (data) {
            _this.selectedVacancy = data;
            console.log(_this.selectedVacancy);
        }, function (err) { return console.log(err); }, function () { return console.log("All done"); });
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