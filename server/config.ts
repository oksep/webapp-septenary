export const serverPort = 8080;
export const length = 128;
export const inviteCode = 'septenary-friend';
export const AuthConfig = {
    JWTSecret: 'jwt-septenary-secret',
    JWTSession: {
        session: false
    },
    JWTExpiration: 60 * 24 * 7 // 1 week
};

export const DBConfig = {
    host: 'mongodb://localhost:27017/blog'
};

export const QiniuConfig = {
    ACCESS_KEY: '',
    SECRET_KEY: '',
    BUCKET_NAME: 'assets'
};