"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AddVacancyComponent = /** @class */ (function () {
    function AddVacancyComponent(dataService, authorizeService, router) {
        this.dataService = dataService;
        this.authorizeService = authorizeService;
        this.router = router;
        this.vacancy = {
            ageFrom: null,
            ageTo: null,
            status: null,
            contactName: null,
            driverExperience: null,
            description: null,
            specialization: {
                name: null,
                employmentType: null,
                paymentType: null,
                paymentPrice: null,
                experience: null,
                recomendation: null,
                education: {
                    speciality: null,
                    additionalEducation: null
                }
            },
            location: {
                country: null,
                city: null,
                region: null,
                street: null
            }
        };
    }
    AddVacancyComponent.prototype.getName = function () {
        var _this = this;
        var value = this.authorizeService.getUser()
            .pipe(operators_1.map(function (u) { return u.name; }))
            .subscribe(function (data) {
            _this.vacancy.contactName = data;
            console.log(data);
        });
        return value;
    };
    AddVacancyComponent.prototype.addVacancy = function (form) {
        this.getName();
        this.dataService.addVacancy(this.vacancy)
            .subscribe(function (data) { return console.log(data); }, function (err) {
            console.log(err);
            throw err;
        });
        // To be updated
        //this.router.navigate(['']);
    };
    AddVacancyComponent = __decorate([
        core_1.Component({
            selector: 'app-add-vacancy',
            templateUrl: './add-vacancy.component.html',
            styleUrls: ['./add-vacancy.component.css']
        })
    ], AddVacancyComponent);
    return AddVacancyComponent;
}());
exports.AddVacancyComponent = AddVacancyComponent;
//# sourceMappingURL=add-vacancy.component.js.map