import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserMeComponent} from "./user-me/user-me.component";

import {UserService} from "./user.service";

import {UserRoutingModule} from "./user.routing";
import {AuthGuard} from "../auth/auth.guard";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        UserRoutingModule
    ],
    declarations: [
        UserMeComponent,
        UserLoginComponent,
        UserRegisterComponent
    ],
    providers: [
        UserService,
        AuthGuard
    ]
})
export class UserModule {
}
