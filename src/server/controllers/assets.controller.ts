import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { AssetModel, IAssetDocument } from '../models/asset.model';

export class AssetsController extends BaseController {

    public list(req: Request, res: Response ): void {

        let query = { owner: req.user.id, deletedAt: null };
        let pageNumber: number = +req.query.page;
        let paginateInfo = { select: 'id name description price createdAt', page: pageNumber, limit: 15, sort: { createdAt: -1 } };

        AssetModel.paginate(query, paginateInfo, (err, result) => {

            if (err)
                res.status(HttpStatus.FORBIDDEN).json();

            res.status(HttpStatus.OK).json(result);
        });
    }

    public search(req: Request, res: Response ): void {

        let pageNumber: number = +req.query.page;
        let terms: string[] = (<string> req.query.term).split(' ');
        let likeRegExps: RegExp[] = [];

        // Add like expression for each term
        terms.forEach((item, i) => {
            likeRegExps.push(new RegExp(item, 'i'));
        });

        let query = {

            deletedAt: null,
            $or:
            [{
                name: { $in: likeRegExps }
            },
            {
                description: { $in: likeRegExps }
            }]
        };

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
        this.router.get(Routes.search, Passport.authorize('jwt', this.authOptions), this.search);
    }
}

export default new AssetsController(AssetModel).router;
