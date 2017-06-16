import { Request, Response, NextFunction } from 'express';
import Passport from '../passport';
import HttpStatus from 'http-status-codes';

import { BaseController } from './base.controller';

import { Routes } from '../routes';
import { ExchangeService } from '../services/exchange.service';
import { ExchangeModel } from '../models/exchange.model';
import { AssetModel } from '../models/asset.model';
import { HandModel } from '../models/hand.model';
import { XChangesError } from '../xchanges.error';

export class ExchangesController extends BaseController {

    constructor() {
        super();
        this.config();
    }

    protected create = (req: Request, res: Response): void => {

        let service: ExchangeService = new ExchangeService(ExchangeModel, AssetModel, HandModel);

        service.create(req.body.assetId, req.user.id, err => {

            if (err) {

                if (err instanceof XChangesError)
                    res.status(err.status).json(err);
                else
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();

                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    protected list = (req: Request, res: Response): void => {

        const service: ExchangeService = new ExchangeService(ExchangeModel, AssetModel, HandModel);

        service.list(req.user.id, (err, result) => {

            if (err) {

                if (err instanceof XChangesError)
                    res.status(err.status).json(err);
                else
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();

                return;
            }

            res.status(HttpStatus.OK).json(result);
        });
    }

    protected read = (req: Request, res: Response): void => {

        ExchangeModel.findOne({ asset: req.query.id })
                     .populate('asset').exec((err, result) => {

            if (err) {

                if (err instanceof XChangesError)
                    res.status(err.status).json(err);
                else
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();

                return;
            }

            res.status(HttpStatus.OK).json(result);
        });
    }

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), this.create);
        this.router.get(Routes.root, Passport.authorize('jwt', this.authOptions), this.read);

        this.router.get(Routes.list, Passport.authorize('jwt', this.authOptions), this.list);
    }
}
