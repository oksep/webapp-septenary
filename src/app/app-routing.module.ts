import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

// import {HomeComponent} from './home/home.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'crisis', loadChildren: 'app/crisis/crisis.module#CrisisModule'},
    {path: 'heroes', loadChildren: 'app/hero/hero.module#HeroModule'},
    {path: 'animate-heroes', loadChildren: 'app/animate-heroes/animate-heroes.module#AnimateHeroesModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
