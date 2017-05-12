// 文章
import User from "./user";
export class Article {
    articleID: number; // id
    title: string; // 标题
    tags: string[]; // 标签
    category: string; // 分类
    content: string; // 正文
    summary: string; // 摘要
    views: number; // 浏览数
    createdTime: string; // 创建时间
    updatedTime: string; // 更新时间
    author: User; // 作者
    routerLink = '/article/1';

    // get routerLink() {
    //     // return `/article/${this.articleID}`;
    //     return '/article/1'
    // }
}
