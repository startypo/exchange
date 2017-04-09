import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { UserModel, IUserDocument } from '../models/user.model';
import { IUser } from '../../domain.interfaces';

export class UsersController extends BaseController {

    public login(req: Request, res: Response ): void {

        let email: string = req.body.email;
        let passwd: string = req.body.passwd;

        // validate

        if (!email || !passwd) {
            res.status(HttpStatus.UNAUTHORIZED);
            return;
        }

        UserModel.findOne({ email: email }, (err, user: IUserDocument) => {

            if (err) {
                res.status(HttpStatus.UNAUTHORIZED).json();
                return;
            }
            if (!user) {
                res.status(HttpStatus.UNAUTHORIZED).json();
                return;
            }
            if (!user.verifyPassword(passwd)) {
                res.status(HttpStatus.UNAUTHORIZED).json();
                return;
            }

            let token = user.createToken();

            res.json({ token: token, name: user.name });
        });
    }

    public isRegistred(req: Request, res: Response): void {

        let email: string = req.params.email;

        if (!email) {
            res.status(HttpStatus.NOT_ACCEPTABLE).json();
            return;
        }

        UserModel.isRegistred(email, (err, registred) => {
            res.status(registred ? HttpStatus.OK : HttpStatus.NOT_FOUND).json();
        });
    }

    public register(req: Request, res: Response): void {

        let newUser: IUser = req.body;

        UserModel.register(newUser, (err, user) => {

            if (err) {
                res.status(HttpStatus.NOT_ACCEPTABLE).json();
                return;
            }

            if (!user) {
                res.status(HttpStatus.NOT_ACCEPTABLE).json();
                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    protected config() {

        this.router.post(Routes.login, this.login);
        this.router.get(Routes.isRegistred, this.isRegistred);
        this.router.post(Routes.register, this.register);
    }
}

export default new UsersController().router;
