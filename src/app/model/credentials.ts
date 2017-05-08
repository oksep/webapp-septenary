// 登录凭证
export class Credentials {
    email: string; // 登录邮箱
    password: string; // 登录密码

    constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }

}