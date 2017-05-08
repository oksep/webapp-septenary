import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserMeComponent} from "./user-me/user-me.component";

import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: UserLoginComponent},
    {path: 'register', component: UserRegisterComponent},
    {path: 'me', component: UserMeComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}