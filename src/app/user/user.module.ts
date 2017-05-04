import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";

import {UserService} from "./user.service";

import {UserRoutingModule} from "./user.routing";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        UserRoutingModule
    ],
    declarations: [
        UserLoginComponent,
        UserRegisterComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule {
}
