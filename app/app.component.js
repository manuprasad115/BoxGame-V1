"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.students = [];
        this.populateArrayWithDelay();
    }
    AppComponent.prototype.test = function () {
        alert("test");
    };
    AppComponent.prototype.populateArrayWithDelay = function () {
        var _this = this;
        var people = [
            {
                name: "Alan"
            },
            {
                name: "Jake"
            },
            {
                name: "Harry"
            },
            {
                name: "Susan"
            },
            {
                name: "Sarah"
            },
            {
                name: "Esther"
            }
        ];
        var _loop_1 = function(i) {
            var student = people[i];
            setTimeout(function () {
                _this.students.push(student);
            }, 2000 * (i + 1));
        };
        for (var i = 0; i < people.length; i++) {
            _loop_1(i);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/templates/home.html',
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map