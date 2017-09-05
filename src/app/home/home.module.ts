import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home.routing";

import {AuthGuard} from "../auth/auth.guard";

import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from './footer/footer.component';
import {PageNotFoundComponent} from "./404.component";

@NgModule({
	imports: [
		SharedModule,
		HomeRoutingModule,
	],
	declarations: [
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		PageNotFoundComponent
	],
	providers: [
		AuthGuard,
	]
})
export class HomeModule {
}
