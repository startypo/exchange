import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { UserModel, IUserDocument } from '../models/user.model';

export class UsersController extends BaseController {

    constructor() {
        super(UserModel);
        this.config();
    }

    public login(req: Request, res: Response ): void {

        let params = req.body;

        UserModel.login(params.email, params.passwd, (err, logedin: boolean, user: IUserDocument, token: string) => {

            if (err)
                return res.status(HttpStatus.UNAUTHORIZED).json();
            if (!logedin)
                return res.status(HttpStatus.UNAUTHORIZED).json();

            res.json({ id: user.id, name: user.name, token: token });
        });
    }

    public isRegistred(req: Request, res: Response): void {

        let email: string = req.params.email;

        if (!email) {
            res.status(HttpStatus.BAD_REQUEST).json();
            return;
        }

        UserModel.isRegistred(email, (err, registred) => {
            res.status(registred ? HttpStatus.OK : HttpStatus.NOT_FOUND).json();
        });
    }

    public register(req: Request, res: Response): void {

        let newUser = req.body;

        UserModel.register(newUser, (err, user) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    protected config(): void {

        this.router.delete(Routes.root + ':id', this.delete);

        this.router.post(Routes.login, this.login);
        this.router.get(Routes.isRegistred, this.isRegistred);
        this.router.post(Routes.register, this.register);
    }
}
