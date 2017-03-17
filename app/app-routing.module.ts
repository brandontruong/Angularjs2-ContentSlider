import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SlideComponent } from './slide.component'; 
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
    { path: '',  redirectTo: '/slides/1', pathMatch: 'full'},
    { path: 'slides', redirectTo:'/slides/1', pathMatch: 'full'},
    { path: 'slides/:id', component: SlideComponent},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], 
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = [AppComponent, SlideComponent, PageNotFoundComponent]