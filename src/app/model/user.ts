// 用户
export default class User {
    _id: number;
    name: string; // 昵称
    email: string; // 邮箱
    avatar: string; // 头像
    createdTime: string; // 注册时间
    lastLoginTime: string; // 上次登录时间
    role: string = 'normal'; // 角色

    static wrap(obj: any): User {
        return obj ? obj as User : null;
    }
}