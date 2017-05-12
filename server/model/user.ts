import mongoose from "../dbconnection";
import {IPaginate, MongoosePaginate} from "./plugins/paginate";
import {AutoIncrement} from "./plugins/mongoose-sequence";
import Schema = mongoose.Schema;
import Types = mongoose.Types;
import ObjectId = Types.ObjectId;

interface IUser extends mongoose.Document {
    uid: number,
    name: string,  // 昵称
    email: string,  // 邮箱
    password: string,  // 密钥
    avatar: string,  // 头像
    createdTime: Date,  // 注册时间
    lastLoginTime: Date,  // 最近登录时间
    role: string, // 角色
}

interface IUserModel extends mongoose.Model<IUser>, IPaginate {

}

const UserSchema = new Schema({
    uid: {type: Number, unique: true},
    name: {type: String, required: true},  // 昵称
    email: {type: String, required: true, unique: true},  // 邮箱
    password: {type: String, required: true},  // 密钥
    avatar: String,  // 头像
    createdTime: {type: Date, default: Date.now},  // 注册时间
    lastLoginTime: Date,  // 最近登录时间
    role: {type: String, default: 'normal'}, // 角色
});

// hook: 存储前检查是否已经存在
UserSchema.pre('save', false, function (next) {
    User.findOne({email: this.email}, function (err, doc) {
        if (!doc) {
            next();
        } else {
            next(new Error("账号已存在!"));
        }
    });
});

// 加载自增 id 插件
UserSchema.plugin(AutoIncrement, {inc_field: 'uid'});

// 翻页查询实现
UserSchema.statics.paginate = MongoosePaginate.paginate;

const User = <IUserModel>mongoose.model('User', UserSchema);

export default User;