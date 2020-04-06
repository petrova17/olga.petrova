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
var enum_1 = require("../../models/enum");
var forms_1 = require("@angular/forms");
var trackerError_1 = require("../../models/trackerError");
var AddVacancyComponent = /** @class */ (function () {
    function AddVacancyComponent(dataService, authorizeService, router, fb) {
        this.dataService = dataService;
        this.authorizeService = authorizeService;
        this.router = router;
        this.fb = fb;
        this.trackerError = new trackerError_1.TrackerError();
    }
    AddVacancyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authorizeService.getUser()
            .pipe(operators_1.map(function (u) { return u.name; }))
            .subscribe(function (data) {
            _this.currentUserName = data;
            console.log(data);
        });
        this.addVacancyForm = this.fb.group({
            description: ['', forms_1.Validators.required],
            ageFrom: ['', forms_1.Validators.required],
            ageTo: ['', forms_1.Validators.required],
            status: [''],
            contactName: [''],
            drivingExperience: ['', forms_1.Validators.required],
            //driverVacancy: this.buildDriverVacancy(),
            specialization: this.buildSpecialization(),
            location: this.buildLocation()
        });
    };
    AddVacancyComponent.prototype.buildDriverVacancy = function () {
        return this.fb.group({
            drivingExperience: ['', forms_1.Validators.required],
        });
    };
    AddVacancyComponent.prototype.buildSpecialization = function () {
        return this.fb.group({
            specializationType: ['', forms_1.Validators.required],
            employmentType: ['', forms_1.Validators.required],
            paymentType: ['', forms_1.Validators.required],
            paymentPrice: [''],
            experience: [''],
            educationType: ['', forms_1.Validators.required],
        });
    };
    AddVacancyComponent.prototype.buildLocation = function () {
        return this.fb.group({
            country: ['', forms_1.Validators.required],
            city: ['', forms_1.Validators.required],
            region: [''],
            street: [''],
        });
    };
    AddVacancyComponent.prototype.addVacancy = function () {
        var _this = this;
        if (this.addVacancyForm.valid) {
            this.addVacancyForm.patchValue({
                status: enum_1.Status.Saved,
                contactName: this.currentUserName
            });
            this.dataService.addDriverVacancy(this.addVacancyForm.value)
                .subscribe(function (data) { return console.log(data); }, function (err) {
                _this.trackerError.friendlyMessage = err.friendlyMessage;
            });
            //To be updated
            this.router.navigate(['']);
        }
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