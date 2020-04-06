"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var specialization_1 = require("./specialization");
var location_1 = require("./location");
var Vacancy = /** @class */ (function () {
    function Vacancy(id, ageFrom, ageTo, status, contactName, drivingExperience, description, specialization, location) {
        if (id === void 0) { id = null; }
        if (ageFrom === void 0) { ageFrom = null; }
        if (ageTo === void 0) { ageTo = null; }
        if (status === void 0) { status = null; }
        if (contactName === void 0) { contactName = null; }
        if (drivingExperience === void 0) { drivingExperience = null; }
        if (description === void 0) { description = null; }
        if (specialization === void 0) { specialization = new specialization_1.Specialization(); }
        if (location === void 0) { location = new location_1.Location(); }
    }
    return Vacancy;
}());
exports.Vacancy = Vacancy;
//# sourceMappingURL=vacancy.js.map