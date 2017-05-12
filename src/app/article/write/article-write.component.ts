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

    private markdownEditor: any; // md 编辑器

    private article = new Article(); // 文章

    constructor(private articleService: ArticleService, private router: Router) {
        this.article.content = `
▼超过600种精美的卡牌插画
超过600种以上源自全世界注册玩家人数突破2000万人的Cygames代表作《巴哈姆特之怒》的精美卡牌插画！
第2弹以后也将陆续登场。
来亲自感受令人震撼的图绘以及最强的对战。

▼全语音剧情模式
由７名主人公所构成的庄严的黑暗幻想故事。
由Cygames 代表性插画师绘制，
豪华声优阵容出演。
来亲眼目睹《暗影次元》的深渊吧。

▼丰富多彩的战略。胜利的关键是“进化”
所有出场战斗的”单位（士兵）卡牌”都可以进化。
进化王牌使其强化，开拓胜利之路。

▼全世界的竞争对手在等你出场
通过“自由匹配”牛刀小试。
通过“个人对战”与好友对战。
通过“天梯匹配”全力争霸。
编组只属于你的最强牌组，使它扬名四海吧。
        `;
        this.article.title = '暗影诗章';
        this.article.tags = ['Shadowverse', 'RPG'];
        this.article.category = '游戏'
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
                        this.router.navigateByUrl(`/article/${result.data.articleID}`)
                    } else {
                        console.log(result);
                    }
                });
        }
    }

}
