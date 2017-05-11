export const serverPort = 4300;
export const secret = 'RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!';
export const length = 128;
export const digest = 'sha256';
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