import mongoose, {AutoIncrement} from "../dbconnection";
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

interface IUserModel extends mongoose.Model<IUser> {

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

UserSchema.pre('save', false, function (next) {
    User.findOne({email: this.email}, function (err, doc) {
        if (!doc) {
            next();
        } else {
            next(new Error("账号已存在!"));
        }
    });
});

UserSchema.plugin(AutoIncrement, {inc_field: 'uid'});

const User = <IUserModel>mongoose.model('User', UserSchema);

export default User;