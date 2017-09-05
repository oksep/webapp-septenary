import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserRegisterComponent} from "./register/user-register.component";
import {UserLoginComponent} from "./login/user-login.component";

const routes: Routes = [
	{path: 'auth/login', component: UserLoginComponent},
	{path: 'auth/register', component: UserRegisterComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRouting {
}