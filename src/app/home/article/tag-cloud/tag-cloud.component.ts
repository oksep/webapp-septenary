import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../article.service";

class CloudTag {
    value: string;
    count: number;

    constructor(value: string, count: number) {
        this.value = value;
        this.count = count;
    }
}

@Component({
    selector: 'app-tag-cloud',
    templateUrl: './tag-cloud.component.html',
    styleUrls: ['./tag-cloud.component.scss']
})
export class TagsComponent implements OnInit {

    cloudTags: CloudTag[] = [];

    constructor(private articleService: ArticleService) {
    }

    ngOnInit() {
        this.articleService.getTags().subscribe(result => {
            if (result) {
                let data = result.data as any;
                for (let tag of data) {
                    this.cloudTags.push(new CloudTag(tag._id, tag.count));
                }
            }
        });

        // this.articleService.debug(this.articleService.getTags());
    }

}
