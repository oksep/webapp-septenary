// 文章
import {User} from "./user";
export class Article {
    _id: number; // id
    title: string; // 标题
    banner: string; // 横幅
    tags: string[]; // 标签
    category: string; // 分类
    content: string; // 正文
    summary: string; // 摘要
		summaryImages: string[]; // 摘要贴图
    views: number; // 浏览数
    createdTime: string; // 创建时间
    updatedTime: string; // 更新时间
		imageResources: string[]; // 图床
    author: User; // 作者
}
