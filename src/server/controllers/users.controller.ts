import { Request, Response } from 'express';
import passport from '../passport';


import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { User } from '../models/user.model';

export class UsersController extends BaseController {

    public register(req: Request, res: Response): void {
        res.status(200);
    }

    public getUsers(req: Request, res: Response): void {
        res.json(User.list());
    };

    protected config() {
        this.router.get('/', passport.authenticate('jwt', { session: false }), this.getUsers);
        this.router.post(Routes.register, passport.authenticate('jwt', { session: false }), this.register);
    }
}

export default new UsersController().router;
