import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base';
import { User } from '../models/user';
import { Config } from '../config';
import passport from '../passport';
import jwt from 'jsonwebtoken';

export class AuthController extends BaseController {

    public login(req: Request, res: Response, next: NextFunction): void {

        let _email = req.body.email;
        let _passwd = req.body.passwd;

        if (!_email || !_passwd)
            res.status(401).json();

        User.find({ email: _email }, (err, user: User) => {

            if (err)
                res.status(401).json();
            if (!user)
                res.status(401).json();
            if (!user.verifyPassword(_passwd))
                res.status(401).json();

            let payload = {
                iss: Config.security.issuer,
                aud: Config.security.audience,
                iat: Config.security.issuedAt,
                sub: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            };

            let token = jwt.sign(payload, Config.security.secret);
            res.json({ auth: token });
        });
    }

    public logout(req: Request, res: Response, next: NextFunction): void {

        res.json({ auth: '' });
    }

    protected config() {
        this.router.post('/login', this.login);
        this.router.post('/logout', passport.authenticate('jwt', { session: false} ), this.logout);
    }
}

export default new AuthController().router;
