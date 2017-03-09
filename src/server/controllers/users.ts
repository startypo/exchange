import { Request, Response, NextFunction } from 'express';

export class UsersController {

    public get(req: Request, res: Response, next: NextFunction): void {
        res.send('{"teste": "testeJSON"}');
    };
}
