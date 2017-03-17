import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    template: `<h3>{{errorMsg}}</h3>
                <div class="container">
                <div class="collapsiblePanel">
                    <h1><span><i class="fa fa-file fa-lg"></i></span>{{sliderTitle}}</h1>
                    <a class="collapsibleButton" href="javascript:;" (click)="collapse()">
                        <i [class]="collapsible?'fa fa-lg fa-caret-down':'fa fa-lg fa-caret-up'"></i>
                    </a>
                </div>
                <div class="accordion-content" [class.slide-up]="collapsible">
                  <ul class="sliders" >
                    <li [class.current]="((selectedIndex-1)===currentElementIndex)" *ngFor="let slide of sliders; let currentElementIndex = index">
                      <div class="slider">
                        <div *ngIf="(slide?.thumbnail!==undefined)&&(slide?.thumbnail!=='')" class="img">
                          <img src="images/{{slide?.thumbnail}}" [alt]="slide?.title" />
                        </div>
                        <div class="description" [innerHTML]="slide?.description"></div>
                      </div>      
                    </li>
                  </ul>
                  <div class="sliderNavigation">
                    <span class="back" *ngIf="(selectedIndex-1) > 0">
                      <i class="fa fa-caret-left"></i>
                      <a href="javascript:;" (click)="goPrevious()">Prev</a>
                    </span>
                    <span class="next" *ngIf="selectedIndex < sliders?.length">
                      <a href="javascript:;" (click)="goNext()">{{nextSlideTitle}}</a>
                      <i class="fa fa-caret-right"></i>
                    </span>
                  </div>
                </div>
             </div>`
})
export class SlideComponent implements OnInit {
    sliders: any[];
    selectedIndex = 0;
    nextSlideTitle: string = '';
    sliderTitle: string = '';
    errorMsg: string;
    collapsible: boolean = false;
    constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) { }
    ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            let id = parseInt(params['id']);
            this.selectedIndex = id;
            if (this.sliders !== undefined && (this.selectedIndex < this.sliders.length)) {
                this.nextSlideTitle = this.sliders[this.selectedIndex].title;
            }
        })
        this._dataService.getData().subscribe(
            resData => {
                this.sliders = resData.content;
                this.sliderTitle = resData.title;
                if (this.sliders !== undefined && (this.selectedIndex < this.sliders.length)) {
                    this.nextSlideTitle = this.sliders[this.selectedIndex].title;
                }
            },
            resError => this.errorMsg = resError
        );
    }
    goPrevious() {
        this.selectedIndex -= 1;
        this._router.navigate(['../', this.selectedIndex], {relativeTo: this._route});
    }
    goNext() {
        this.selectedIndex += 1;
        this._router.navigate(['../', this.selectedIndex], {relativeTo: this._route});
    }
    collapse() {
        this.collapsible = !this.collapsible;
    }
}
