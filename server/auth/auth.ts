import * as passport from 'passport';
import * as JWT from 'passport-jwt';
import Config from './config';

interface PayLoad {
    id: string;
}

const users = [];

const JWTStrategy = new JWT.Strategy(
    {
        secretOrKey: Config.JWTSecret, // the JWT secret key.
        jwtFromRequest: JWT.ExtractJwt.fromAuthHeader(), // defines where the tokens will be sent in the response
        passReqToCallback: true
    },
    function (req, payload: PayLoad, done: Function) {
        // console.log('AAA', req);
        let user = users[payload.id] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    }
);

passport.use('jwt', JWTStrategy);

export function initial() {
    return passport.initialize();
}

export function authenticateJWT() {
    return passport.authenticate('jwt', Config.JWTSession)
}