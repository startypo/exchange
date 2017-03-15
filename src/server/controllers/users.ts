import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base';
import { User } from '../models/user';

export class UsersController extends BaseController {

    public getUsers(req: Request, res: Response): void {
        res.json(User.list());
    };

    protected config() {
        this.router.get('/', this.getUsers);
    }
}

export default new UsersController().router;
