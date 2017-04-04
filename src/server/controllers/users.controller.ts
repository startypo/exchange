import { Request, Response } from 'express';
import passport from '../passport';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { UserModel, IUserModel } from '../models/user.model';

export class UsersController extends BaseController {

    public login(req: Request, res: Response ): void {

        let _email = req.body.email;
        let _passwd = req.body.passwd;

        if (!_email || !_passwd)
            res.status(401).json();

        UserModel.findOne({ email: _email }, (err, user) => {

            if (err)
                res.status(401).json();
            if (!user)
                res.status(401).json();
            if (!user.verifyPassword(_passwd))
                res.status(401).json();

            let _token = user.createToken();

            res.json({ token: _token, name: user.name });
        });
    }

    public logout(req: Request, res: Response ): void {

        res.json({ auth: '' });
    }

    public register(req: Request, res: Response): void {

        let newUser: IUserModel = req.body.user;

        // validar



        res.status(200);
        res.json();
    }

    protected config() {

        this.router.post(Routes.register, this.register);
        this.router.post(Routes.login, this.login);
        this.router.post(Routes.logout, passport.authenticate('jwt', { session: false} ), this.logout);
    }
}

export default new UsersController().router;
