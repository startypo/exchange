import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { AssetModel } from '../models/asset.model';
import { IAsset } from '../../domain.interfaces';

export class AssetsController extends BaseController {

    public create(req: Request, res: Response): void {

        let asset: IAsset = req.body;

        new AssetModel(asset).save((err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            res.status(HttpStatus.OK).json({ id : doc.id });
        });

    }

    public read(req: Request, res: Response): void {

        let id: string = req.params.id;

        AssetModel.findById(id, (err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json(doc);
        });
    }

    public update(req: Request, res: Response): void {

        let id: string = req.params.id;
        let asset: IAsset = req.body;

        AssetModel.findByIdAndUpdate(id, asset, (err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    public delete(req: Request, res: Response): void {

        let id: string = req.params.id;

        AssetModel.findByIdAndUpdate(id, { deletedAt: new Date() }, (err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', { session: false }), this.create);
        this.router.get(Routes.root + ':id', Passport.authorize('jwt', { session: false }), this.read);
        this.router.put(Routes.root + ':id', Passport.authorize('jwt', { session: false }), this.update);
        this.router.delete(Routes.root + ':id', Passport.authorize('jwt', { session: false }), this.delete);
    }
}

export default new AssetsController().router;
