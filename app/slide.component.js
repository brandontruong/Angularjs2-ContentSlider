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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("./data.service");
var router_1 = require("@angular/router");
var SlideComponent = (function () {
    function SlideComponent(_dataService, _route, _router) {
        this._dataService = _dataService;
        this._route = _route;
        this._router = _router;
        this.selectedIndex = 0;
        this.nextSlideTitle = '';
        this.sliderTitle = '';
        this.collapsible = false;
    }
    SlideComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = parseInt(params['id']);
            _this.selectedIndex = id;
            if (_this.sliders !== undefined && (_this.selectedIndex < _this.sliders.length)) {
                _this.nextSlideTitle = _this.sliders[_this.selectedIndex].title;
            }
        });
        this._dataService.getData().subscribe(function (resData) {
            _this.sliders = resData.content;
            _this.sliderTitle = resData.title;
            if (_this.sliders !== undefined && (_this.selectedIndex < _this.sliders.length)) {
                _this.nextSlideTitle = _this.sliders[_this.selectedIndex].title;
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    SlideComponent.prototype.goPrevious = function () {
        this.selectedIndex -= 1;
        this._router.navigate(['../', this.selectedIndex], { relativeTo: this._route });
    };
    SlideComponent.prototype.goNext = function () {
        this.selectedIndex += 1;
        this._router.navigate(['../', this.selectedIndex], { relativeTo: this._route });
    };
    SlideComponent.prototype.collapse = function () {
        this.collapsible = !this.collapsible;
    };
    return SlideComponent;
}());
SlideComponent = __decorate([
    core_1.Component({
        template: "<h3>{{errorMsg}}</h3>\n                <div class=\"container\">\n                <div class=\"collapsiblePanel\">\n                    <h1><span><i class=\"fa fa-file fa-lg\"></i></span>{{sliderTitle}}</h1>\n                    <a class=\"collapsibleButton\" href=\"javascript:;\" (click)=\"collapse()\">\n                        <i [class]=\"collapsible?'fa fa-lg fa-caret-down':'fa fa-lg fa-caret-up'\"></i>\n                    </a>\n                </div>\n                <div class=\"accordion-content\" [class.slide-up]=\"collapsible\">\n                  <ul class=\"sliders\" >\n                    <li [class.current]=\"((selectedIndex-1)===currentElementIndex)\" *ngFor=\"let slide of sliders; let currentElementIndex = index\">\n                      <div class=\"slider\">\n                        <div *ngIf=\"(slide?.thumbnail!==undefined)&&(slide?.thumbnail!=='')\" class=\"img\">\n                          <img src=\"images/{{slide?.thumbnail}}\" [alt]=\"slide?.title\" />\n                        </div>\n                        <div class=\"description\" [innerHTML]=\"slide?.description\"></div>\n                      </div>      \n                    </li>\n                  </ul>\n                  <div class=\"sliderNavigation\">\n                    <span class=\"back\" *ngIf=\"(selectedIndex-1) > 0\">\n                      <i class=\"fa fa-caret-left\"></i>\n                      <a href=\"javascript:;\" (click)=\"goPrevious()\">Prev</a>\n                    </span>\n                    <span class=\"next\" *ngIf=\"selectedIndex < sliders?.length\">\n                      <a href=\"javascript:;\" (click)=\"goNext()\">{{nextSlideTitle}}</a>\n                      <i class=\"fa fa-caret-right\"></i>\n                    </span>\n                  </div>\n                </div>\n             </div>"
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, router_1.Router])
], SlideComponent);
exports.SlideComponent = SlideComponent;
//# sourceMappingURL=slide.component.js.map