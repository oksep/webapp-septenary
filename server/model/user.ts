export default class User {
    id: string;
    email: string;
    password: string;

    static find(email, password) {
        let usr = new User();
        usr.id = '518a89723e98712899ac1239';
        return usr;
    }
}