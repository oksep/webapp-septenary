import {NgModule} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {AuthConfig, AuthHttp, IAuthConfigOptional} from "./angular-jwt.module";
import {AuthService, TOKEN_NAME} from "./auth.service";

class Config implements IAuthConfigOptional {
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    let config: IAuthConfigOptional = new Config();
    config.tokenName = TOKEN_NAME;
    return new AuthHttp(new AuthConfig(config), http, options);
}

@NgModule({
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AuthService
    ]
})
export class AuthModule {
}