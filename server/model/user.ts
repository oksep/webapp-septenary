// 用户
export default class User {
    id: number; // 用户 ID
    name: string; // 昵称
    email: string; // 邮箱
    password: string; // 密钥
    avatar: string; // 头像
    createdTime: string; // 注册时间
    lastLoginTime: string; // 最近登录时间
    role: string = 'normal'; // 角色

    constructor(id?, name?, email?, password?, avatar?, createdTime?, lastLoginTime?, role?) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.createdTime = createdTime;
        this.lastLoginTime = lastLoginTime;
        this.role = role || 'normal';
    }

    isAdmin(): boolean {
        return this.role == 'admin';
    }

    static add(email, password) {
        USERS.push(new User(USERS.length + 1, email, password, 'normal'));
    }

    static exist(email) {
        for (let usr of USERS) {
            if (usr.email === email) {
                return true;
            }
        }
        return false;
    }

    static find(email, password) {
        console.log('AAA', email, password);
        for (let usr of USERS) {
            if (usr.email === email && usr.password == password) {
                return usr;
            }
        }
        return null;
    }

    static findByID(id) {
        for (let usr of USERS) {
            if (usr.id == id) {
                return usr;
            }
        }
        return null;
    }

    static listAllUsers() {
        return USERS;
    }
}

const USERS: Array<User> = [
    new User(1, 'Septenary', 'seven__up@sina.cn', '123456', 'http://localhost:5200/src/assets/avatar.jpg', '2016-05-06', '2017-05-03', 'admin'),
    new User(2, 'Ryfthink', 'ryfthink@gmail.com', '654321', 'http://localhost:5200/src/assets/avatar2.jpg', '2017-01-14', '2017-03-21', null),
];