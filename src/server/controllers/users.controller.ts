import { Request, Response } from 'express';
import passport from '../passport';
import jwt from 'jsonwebtoken';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { Config } from '../config';
import { User } from '../models/user.model';

export class UsersController extends BaseController {

    public login(req: Request, res: Response ): void {

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
                    eml: user.email,
                    nam: user.name,
                    prf: user.profile
                }
            };

            let token = jwt.sign(payload, Config.security.secret);
            res.json({ auth: token });
        });
    }

    public logout(req: Request, res: Response ): void {

        res.json({ auth: '' });
    }

    public register(req: Request, res: Response): void {
        res.status(200);
    }

    public getAll(req: Request, res: Response): void {
        res.json(User.list());
    };

    protected config() {

        this.router.post(Routes.register, this.register);
        this.router.post(Routes.login, this.login);
        this.router.post(Routes.logout, passport.authenticate('jwt', { session: false} ), this.logout);
        this.router.get('/', passport.authenticate('jwt', { session: false }), this.getAll);
    }
}

export default new UsersController().router;
