"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var trackerError_1 = require("../models/trackerError");
var InterceptorService = /** @class */ (function () {
    function InterceptorService() {
    }
    InterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        var clone = req.clone({
            headers: headers
        });
        return next.handle(clone)
            .pipe(
        // retry(2),
        operators_1.catchError(function (err) { return _this.handleHttpError(err); }));
    };
    InterceptorService.prototype.handleHttpError = function (error) {
        console.log(error);
        var dataError = new trackerError_1.TrackerError();
        dataError.errorNumber = error.status;
        dataError.message = error.message;
        dataError.friendlyMessage = 'An error occured retrieving data.';
        return rxjs_1.throwError(dataError);
    };
    InterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], InterceptorService);
    return InterceptorService;
}());
exports.InterceptorService = InterceptorService;
//# sourceMappingURL=interceptor.service.js.map