import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt }  from 'passport-jwt';
import { Config } from './config';

export class Passport {

    public passport = passport;

    constructor() {

        let jwtOptions = {
            session: false,
            passReqToCallback : true,
            jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            secretOrKey: Config.security.secret,
            issuer: Config.security.issuer,
            audience: Config.security.audience
        };

        let strategy = new Strategy(jwtOptions, (req, payload, done) => {
            return done(null, payload);
        });

        this.passport.use('jwt', strategy);
    }
}

export default new Passport().passport;
