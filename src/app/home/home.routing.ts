import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home.component";
import {PageNotFoundComponent} from "./404.component";

const routes: Routes = [
	// {path: '', redirectTo: 'article', pathMatch: 'full'},
	{
		path: '',
		component: HomeComponent,
		children: [
			{path: '', loadChildren: './article/article.module#ArticleModule'},
			{path: 'user', loadChildren: './user/user.module#UserModule'},
			// {path: '**', component: PageNotFoundComponent}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {
}
