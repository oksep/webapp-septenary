export const serverPort = 8080;
export const length = 128;
export const inviteCode = 'renyufeng-friend';
export const AuthConfig = {
    JWTSecret: 'e3rrs63w-1c1n-51eyt26we1ewps3acy1tsrty-satcteste',
    JWTSession: {
        session: false
    },
    JWTExpiration: 60 * 24 * 7 // 1 week
};

export const DBConfig = {
    host: 'mongodb://localhost:27017/blog'
};

export const QiniuConfig = {
    ACCESS_KEY: 'f6kMhs1Ed64D6oCFIk-vDnNaNPpDk9mX_U--mCbk',
    SECRET_KEY: 'RzlF2ZaQmsKJNQgDCElwDqUkZSKDDj4w0_uvX-o3',
    BUCKET_NAME: 'assets'
};