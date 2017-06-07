import { Request, Response, NextFunction } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';

import { Routes } from '../routes';
import { ExchangeService } from '../services/exchange.service';
import { ExchangeModel } from '../models/exchange.model';
import { AssetModel } from '../models/asset.model';
import { HandModel } from '../models/hand.model';

export class ExchangesController extends BaseController {

    constructor() {
        super();
        this.config();
    }

    protected create = (req: Request, res: Response, next: NextFunction): void => {

        let service: ExchangeService = new ExchangeService(ExchangeModel, AssetModel, HandModel);

        service.create(req.body.assetId, req.user.id, (err, exchange) => {

            if (err)
                return res.status(HttpStatus.FORBIDDEN).json();

            res.status(HttpStatus.OK).json(exchange);
        });
    }

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), this.create);
    }
}
