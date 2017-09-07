export const serverPort = 8080;
export const secret = 'RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!';
export const length = 128;
export const digest = 'sha256';
export const inviteCode = 'septenary-friend';
export const AuthConfig = {
    JWTSecret: 'jwt-septenary-secret',
    JWTSession: {
        session: false
    },
    JWTExpiration: 60 * 24 // 1 day
};

export const DBConfig = {
    host: 'mongodb://localhost:27017/blog'
};

export const QiniuConfig = {
    ACCESS_KEY: 'i7tA1tYs5KYuN6-nwpsPbUAN2JmI4viHPoNWxUNr',
    SECRET_KEY: 'LD5TqXn0gleXDsmU6fiZA6Ias54Wa0To0183LHkA',
    BUCKET_NAME: 'assets'
};