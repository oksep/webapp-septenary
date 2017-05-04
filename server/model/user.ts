export default class User {
    id: string;
    email: string;
    password: string;
    role: string;
    admin: boolean;

    constructor(id, email, password, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.admin = this.role == 'admin';
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
    new User(1, "seven__up@sina.cn", '123456', 'admin'),
    new User(2, "ryfthink@gmail.com", '654321', 'normal')
];