import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base';

export class UsersController extends BaseController {

    public getUsers(req: Request, res: Response): void {
        res.send('{"teste": "testeJSON"}');
    };

    protected config() {
        this.router.get('/', this.getUsers);
    }
}

export default new UsersController().router;
