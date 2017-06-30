import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus from 'http-status-codes';

import { BaseController } from './base.controller';
import { NotificationModel, INotificationDocument } from '../models/notification.model';
import { Routes } from '../routes';

export class NotificationController extends BaseController {

    constructor() {
        super();
        this.config();
    }

    protected create = (req: Request, res: Response): void => {

        const notification: INotificationDocument = new NotificationModel(req.body);

        notification.save((err, result) => {

            if (err)
                res.status(HttpStatus.BAD_REQUEST).json();

            res.status(HttpStatus.OK).json();
        });
    }

    protected read = (req: Request, res: Response): void => {

        NotificationModel.find({ receiver: req.user.id }, (err, result) => {

            if (err)
                res.status(HttpStatus.BAD_REQUEST).json();

            res.status(HttpStatus.OK).json(result);
        });
    }

    protected delete = (req: Request, res: Response): void => {

        NotificationModel.remove({ _id: req.query.id, receiver: req.user.id }, (err) => {

            if (err)
                res.status(HttpStatus.BAD_REQUEST).json();

            res.status(HttpStatus.OK).json();
        });
    }

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), this.create);
        this.router.get(Routes.root, Passport.authorize('jwt', this.authOptions), this.read);
        this.router.delete(Routes.root, Passport.authorize('jwt', this.authOptions), this.delete);
    }
}
