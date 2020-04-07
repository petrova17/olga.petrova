"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var specialization_1 = require("./specialization");
var location_1 = require("./location");
var Vacancy = /** @class */ (function () {
    function Vacancy() {
        this.id = null;
        this.ageFrom = null;
        this.ageTo = null;
        this.status = null;
        this.contactName = null;
        this.description = null;
        this.specialization = new specialization_1.Specialization();
        this.location = new location_1.Location();
    }
    return Vacancy;
}());
exports.Vacancy = Vacancy;
//# sourceMappingURL=vacancy.js.map