import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserProfileComponent} from "./profile/user-profile.component";

import {AuthGuard} from "../../auth/auth.guard";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
	{path: 'profile', component: UserProfileComponent},
	{path: ':id', component: UserComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule {
}
