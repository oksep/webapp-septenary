import {NgModule}      from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {LoginComponent}  from './login.component';
import {AuthRoutingModule}    from './auth-routing.module';

@NgModule({
    imports: [SharedModule, AuthRoutingModule],
    declarations: [LoginComponent],
})
export class AuthModule {
}