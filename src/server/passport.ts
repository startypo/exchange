import passport from 'passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from './config';
import { Routes } from './routes';

export class Passport {

     private static permissions = {
        user: [
            { route: Routes.assets, methods: ['*'] }
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
        paths = paths.slice(3);
        let permissions = Passport.permissions[profileName];
        let authorized: boolean = false;

        paths.forEach(path => {

            let permission = permissions.find(p => p.route.endsWith(path));

            if (permission && permission.methods.find(m => m.toLowerCase() === method.toLowerCase() || m === '*'))
                authorized = true;
        });

        return authorized;
    }
}

export default new Passport().passport;
