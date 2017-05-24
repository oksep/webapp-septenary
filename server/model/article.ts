import mongoose from "../dbconnection";
import {IPaginate, MongoosePaginate} from "./plugins/paginate";
import autoIncrementPlugin from "./plugins/identity-counter";
import Schema = mongoose.Schema;

interface IArticle extends mongoose.Document {
    title: string; // 标题
    tags: string[]; // 标签
    category: string; // 分类
    content: string; // 正文
    summary: string; // 摘要
    views: number; // 浏览数
    createdTime: Date; // 创建时间
    updatedTime: Date; // 更新时间
    author: number

    log(): void
}

interface IArticleModel extends mongoose.Model<IArticle>, IPaginate {
    staticMethod(): void
}

const ArticleSchema = new Schema({
    title: {type: String, required: true}, // 标题
    tags: [String], // 标签
    category: String, // 分类
    content: String, // 正文
    summary: String, // 摘要
    views: {type: Number, default: 0}, // 浏览数
    createdTime: {type: Date, default: Date.now}, // 创建时间
    updatedTime: {type: Date, default: Date.now}, // 更新时间
    author: {type: Number, ref: 'User', required: true}
});

// 日志 实例方法
ArticleSchema.methods.log = () => {
    console.log('InstanceMethod....')
};

// 加载自增 id 插件
ArticleSchema.plugin(autoIncrementPlugin, 'Article');

// 翻页实现
ArticleSchema.statics.paginate = MongoosePaginate.paginate;

// 静态方法
ArticleSchema.statics.staticMethod = () => {
    console.log('StaticMethod....')
};

const Article = <IArticleModel>mongoose.model('Article', ArticleSchema);

export default Article;