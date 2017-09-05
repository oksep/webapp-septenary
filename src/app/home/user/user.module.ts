import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";

import {UserService} from "./user.service";

import {UserRoutingModule} from "./user.routing";
import {AuthGuard} from "../../auth/auth.guard";
import {UserComponent} from './user/user.component';
import {UserProfileComponent} from "./profile/user-profile.component";

@NgModule({
	imports: [
		SharedModule,
		UserRoutingModule
	],
	declarations: [
		UserProfileComponent,
		UserComponent
	],
	providers: [
		UserService,
		AuthGuard
	]
})
export class UserModule {
}
