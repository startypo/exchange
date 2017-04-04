import passport from 'passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ExtractJwt }  from 'passport-jwt';
import { Config } from './config';
import { Routes } from './routes';

export class Passport {

     private static permissions = {
        user: [
            { route: Routes.logout, methods: ['post'] }
        ]
    };

    public passport = passport;

    constructor() {

        let jwtOptions = {
            session: false,
            passReqToCallback : true,
            jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            secretOrKey: Config.security.secret,
            issuer: Config.security.issuer,
            audience: Config.security.audience,
        };

        let strategy = new Strategy(jwtOptions, (req: Request, payload, done) => {

            if (!this.authorize(payload.sub, req.originalUrl, req.method))
                return done(null, false);

            return done(null, payload);
        });

        this.passport.use('jwt', strategy);
    }

    private authorize(profileName: string, url: string, method: string): boolean {

        if (profileName === 'admin')
            return true;

        let paths: string[] = url.split('/');
        let route: string = paths.pop();
        let permissions = Passport.permissions[profileName];
        let permission = permissions.find(p => p.route.endsWith(route));
        if (!permission)
            return false;
        if (!permission.methods.find(m => m.toLowerCase() === method.toLowerCase() || m === '*'))
            return false;

        return true;
    }
}

export default new Passport().passport;
