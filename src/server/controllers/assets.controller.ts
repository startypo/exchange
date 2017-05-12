import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { AssetModel } from '../models/asset.model';

export class AssetsController extends BaseController {

    public list(req: Request, res: Response ): void {

        let query = { owner: req.user.id, deletedAt: null };
        let pageNumber: number = Number(req.query.page);
        let paginateInfo = { select: 'id name description price createdAt', page: pageNumber, limit: 15, sort: { createdAt: -1 } };

        AssetModel.paginate(query, paginateInfo, (err, result) => {

            if (err)
                res.status(HttpStatus.FORBIDDEN).json();

            res.status(HttpStatus.OK).json(result);
        });
    }

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), this.create);
        this.router.get(Routes.root, Passport.authorize('jwt', this.authOptions), this.read);
        this.router.put(Routes.root, Passport.authorize('jwt', this.authOptions), this.update);
        this.router.delete(Routes.root, Passport.authorize('jwt', this.authOptions), this.delete);

        this.router.get(Routes.list, Passport.authorize('jwt', this.authOptions), this.list);
    }
}

export default new AssetsController(AssetModel).router;
