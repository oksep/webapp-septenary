import User from "./user";

// 文章
export class Post {
    id: number; // 文章 ID
    title: string; // 标题
    tags: string[]; // 标签
    category: string; // 分类
    content: string; // 正文
    summary: string; // 摘要
    views: number; // 浏览数
    createdTime: string; // 创建时间
    updatedTime: string; // 更新时间
    author: User; // 作者

    constructor(id, title, tags, category, content, summary, views, createdTime, updatedTime, author) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.category = category;
        this.content = content;
        this.summary = summary;
        this.views = views;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
        this.author = author;
    }

    static addPost() {
        POSTS.push(new Post(
            0,
            'ES 集群管理工具 elasticsearch-head',
            ['elasticsearch', 'logstash', 'kibana'],
            'elastic',
            '这里是正文',
            '这里是摘要',
            8081,
            '2016-06-13',
            '2016-06-19',
            User.findByID(1)
        ));
    }

    static listAllPosts() {
        return POSTS;
    }

    static getPostByPage(page: number) {
        console.log('Page', page);
        return {
            total: POSTS.length,
            maxPage: 3,
            currentPage: 5,
            list: POSTS.slice((page - 1) * 5, (page - 1) * 5 + 5)
        };
    }

}

const POSTS = [];

{
    for (let i = 0; i < 15; i++) {
        POSTS.push(new Post(
            i,
            'ES 集群管理工具 elasticsearch-head',
            ['elasticsearch', 'logstash', 'kibana'],
            'elastic',
            '这里是正文',
            '这里是摘要',
            8081,
            '2016-06-13',
            '2016-06-19',
            User.findByID(1)
        ));
    }
}
