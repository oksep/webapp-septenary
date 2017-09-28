export class Comment {
	_id: number; // id
	name: string;  // 评论者名字
	email: string;  // 评论者邮箱
	content: string;  // 评论内容
	website: string;  // 评论者网站地址
	createdTime: number;  // 评论创建时间
	article: number // 评论文章ID
}