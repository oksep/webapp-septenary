import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../article.service";

@Component({
	selector: 'app-tag-cloud',
	templateUrl: './tag-cloud.component.html',
	styleUrls: ['./tag-cloud.component.scss']
})
export class TagsComponent implements OnInit {

	tags: { _id: string, count: number }[] = [];

	constructor(private articleService: ArticleService) {
	}

	ngOnInit() {
		this.articleService.getTags(true).subscribe((tags: { _id: string, count: number }[]) => {
			this.tags = tags;
		});

		// this.articleService.debug(this.articleService.getTags());
	}

}
