import mongoose, {AutoIncrement} from "../dbconnection";

import Schema = mongoose.Schema;
import Types = mongoose.Types;
import ObjectId = Types.ObjectId;

interface IArticle extends mongoose.Document {
    articleID: number; // 文章 ID
    title: string; // 标题
    tags: string[]; // 标签
    category: string; // 分类
    content: string; // 正文
    summary: string; // 摘要
    views: number; // 浏览数
    createdTime: Date; // 创建时间
    updatedTime: Date; // 更新时间
    authorID: number; // 作者 ID

    log(): void
}

interface IArticleModel extends mongoose.Model<IArticle> {
    staticMethod(): void
}

const ArticleSchema = new Schema({
    articleID: {type: Number, unique: true}, // 文章 ID
    title: {type: String, required: true}, // 标题
    tags: [String], // 标签
    category: String, // 分类
    content: String, // 正文
    summary: String, // 摘要
    views: {type: Number, default: 0}, // 浏览数
    createdTime: {type: Date, default: Date.now}, // 创建时间
    updatedTime: {type: Date, default: Date.now}, // 更新时间
    authorID: {type: Number, required: true} // 作者
});

ArticleSchema.plugin(AutoIncrement, {inc_field: 'articleID'});

ArticleSchema.methods.log = () => {
    console.log('InstanceMethod....')
};

ArticleSchema.statics.staticMethod = () => {
    console.log('StaticMethod....')
};

const Article = <IArticleModel>mongoose.model('Article', ArticleSchema);

export default Article;