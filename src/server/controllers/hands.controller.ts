import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { HandModel, IHandDocument } from '../models/hand.model';
import { UserModel, IUserDocument } from '../models/user.model';
import { Routes } from '../routes';


export class HandsController extends BaseController {

    constructor() {
        super(HandModel);
        this.config();
    }

    protected read = (req: Request, res: Response): void => {

        this.model.findOne({ owner: req.user.id })
                  .populate('owner')
                  .exec((err, doc: IHandDocument) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            if (!doc || (<IUserDocument> doc.owner).deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json({ amount: doc.amount });
        });
    }

    protected update = (req: Request, res: Response): void => {

        let watchTime: number = +req.body.time;

        

        res.status(HttpStatus.OK).json({ amount: 3.49 });
    }

    protected config(): void {

        this.router.get(Routes.root, Passport.authorize('jwt', this.authOptions), this.read);
        this.router.put(Routes.root, Passport.authorize('jwt', this.authOptions), this.update);
    }
}
