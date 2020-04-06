"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.getDriverVacancies = function () {
        return this.http.get('/api/DriverVacancies/');
    };
    DataService.prototype.getDriverVacancy = function (id) {
        return this.http.get("/api/DriverVacancies/" + id);
    };
    DataService.prototype.addDriverVacancy = function (newVacancy) {
        return this.http.post('/api/DriverVacancies', newVacancy);
    };
    DataService.prototype.deleteDriverVacancy = function (id) {
        return this.http.delete("/api/DriverVacancies/" + id);
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map