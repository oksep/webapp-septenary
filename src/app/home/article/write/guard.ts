import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ArticleWriteComponent} from "./article-write.component";

@Injectable()
export class EditArticleGuard implements CanDeactivate<ArticleWriteComponent> {
	canDeactivate(component: ArticleWriteComponent,
								route: ActivatedRouteSnapshot,
								state: RouterStateSnapshot): Promise<boolean> | boolean {
		return component.ensureNotChanged();
	}
}