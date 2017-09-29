import mongoose from "../db/dbconnection";
import {IPaginate, MongoosePaginate} from "../db/plugins/paginate";
import autoIncrementPlugin from "../db/plugins/identity-counter";
import Schema = mongoose.Schema;

export interface IComment extends mongoose.Document {
	name: string,  // 评论者名字
	email: string,  // 评论者邮箱
	content: string,  // 评论内容
	website: string,  // 评论者网站地址
	createdTime: Date,  // 评论创建时间
	article: number // 评论文章ID
}

interface ICommentModel extends mongoose.Model<IComment>, IPaginate {

}

const CommentSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	content: {type: String, required: true},
	website: {type: String},
	createdTime: {type: Date, default: Date.now},
	article: {type: Number},
});

// 加载自增 id 插件
CommentSchema.plugin(autoIncrementPlugin, {
	_model: 'Comment',
	field: '_id',
	startAt: 1,
	incrementBy: 1
});

// 翻页查询实现
CommentSchema.statics.paginate = MongoosePaginate.paginate;

const Comment = <ICommentModel>mongoose.model('Comment', CommentSchema);

export default Comment;