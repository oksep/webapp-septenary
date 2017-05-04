import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home.component";

// const routes: Routes = [
//     {path: '', redirectTo: 'post', pathMatch: 'full'},
//     // {path: '', component: HomeComponent},
//     // {path: '', loadChildren: '../post/post.module#PostModule'}
// ];


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: '',
            loadChildren: '../post/post.module#PostModule'
        }]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
