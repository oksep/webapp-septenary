import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";
import {Router} from "@angular/router";

const MORE_TAG = '<!--more-->';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-write.component.html',
    styleUrls: ['./article-write.component.css']
})
export class ArticleWriteComponent implements OnInit, AfterViewInit {

    @ViewChild('simplemde') textarea: ElementRef;

    markdownEditor: any; // md 编辑器

    article = new Article(); // 文章

    powers = ['App', 'Web', 'Server', 'Elastic'];

    constructor(private articleService: ArticleService, private router: Router) {
        this.article.title = '暗影诗章';
        this.article.tags = ['Shadowverse', 'RPG'];
        this.article.category = this.powers[0];
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        // 初始化 markdown 编辑器
        this.markdownEditor = new SimpleMDE({
            element: this.textarea.nativeElement,
            // showIcons: ["code", "table"]
        });

        // 编辑器监听
        this.markdownEditor.codemirror.on('change', () => {
            this.article.content = this.markdownEditor.value();
        });
        // 初始化时间选择器
        flatpickr(".flatpickr", {enableTime: true});
    }


    onPublishClick() {
        let available = this.article.content
            && this.article.title
            && this.article.category
            && this.article.tags
            && this.article.tags.length > 0;
        if (available) {
            const index = this.article.content.indexOf(MORE_TAG);
            if (index > 0) {
                this.article.summary = this.article.content.substring(0, index);
            }
            this.articleService
                .createArticle(this.article)
                .subscribe(result => {
                    if (result.success) {
                        this.router.navigateByUrl(`/article/${result.data._id}`)
                    } else {
                        console.warn(result);
                    }
                });
        }
    }

}
