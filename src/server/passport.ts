import passport from 'passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from './config';
import { Routes } from './routes';

export class Passport {

    private static permissions = {
        user: [
            { route: Routes.assets, methods: ['*'] },
            { route: Routes.files, methods: ['post', 'delete'] }
        ]
    };

    public passport = passport;

    constructor() {

        let jwtOptions = {

            passReqToCallback : true,
            jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            secretOrKey: Config.security.secret,
            issuer: Config.security.issuer,
            audience: Config.security.audience
        };

        let strategy = new Strategy(jwtOptions, (req: Request, payload, done) => {

            if (!this.authorize(payload.sub.prf, req.originalUrl, req.method))
                return done(null, false);

            req.user = payload.sub;
            return done(null, payload.sub);
        });

        this.passport.use('jwt', strategy);
    }

    private authorize(profileName: string, url: string, method: string): boolean {

        if (profileName === 'admin')
            return true;

        let paths: string[] = url.split('/');
        paths.shift();
        paths.reverse();

        if (paths[0].includes('?'))
            paths[0] = paths[0].split('?')[0];

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
