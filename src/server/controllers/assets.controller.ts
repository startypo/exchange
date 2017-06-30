import { Request, Response, NextFunction } from 'express';
import Passport from '../passport';
import HttpStatus from 'http-status-codes';
import * as fs from 'fs';
import * as path from 'path';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { AssetModel, IAssetDocument } from '../models/asset.model';
import { Config } from '../config';

export class AssetsController extends BaseController {

    constructor() {
        super(AssetModel);
        this.config();
    }

    public list(req: Request, res: Response ): void {

        const query = { owner: req.user.id, deletedAt: null, exchange: null };
        const pageNumber: number = +req.query.page;
        const paginateInfo = { select: 'id name description price imgs owner createdAt', page: pageNumber, limit: 15, sort: { createdAt: -1 } };

        AssetModel.paginate(query, paginateInfo, (err, result) => {

            if (err)
                res.status(HttpStatus.FORBIDDEN).json();

            res.status(HttpStatus.OK).json(result);
        });
    }

    public search(req: Request, res: Response ): void {

        const pageNumber: number = +req.query.page;
        const terms: string[] = (req.query.term as string).split(' ');
        const likeRegExps: RegExp[] = [];

        // Add like expression for each term
        terms.forEach((item, i) => {
            likeRegExps.push(new RegExp(item, 'i'));
        });

        const query = {

            deletedAt: null,
            exchange: null,
            owner: { $ne: req.user.id },
            $or:
            [{
                name: { $in: likeRegExps }
            },
            {
                description: { $in: likeRegExps }
            }]
        };

        const paginateInfo = { select: 'id name description price owner imgs createdAt', page: pageNumber, limit: 15, sort: { createdAt: -1 } };

        AssetModel.paginate(query, paginateInfo, (err, result) => {

            if (err)
                res.status(HttpStatus.FORBIDDEN).json();

            res.status(HttpStatus.OK).json(result);
        });
    }

    protected create = (req: Request, res: Response): void => {

        const doc: IAssetDocument = req.body;

        if (doc.imgs.length === 0) {
            res.status(HttpStatus.FORBIDDEN).json();
            return;
        }

        // verify if image files exist in temporary directory and move to production directory.
        const tmpDirPath = path.join(Config.uploadPath, req.user.id);

        for (let filename of doc.imgs) {

            const sourceFilePath = path.join(tmpDirPath, filename);
            const destFilePath = path.join(Config.uploadPath, filename);

            if (!fs.existsSync(sourceFilePath)) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            const source = fs.createReadStream(sourceFilePath);
            const dest = fs.createWriteStream(destFilePath);
            source.pipe(dest);
            source.on('error', (err) => console.log(err));
        }

        // save asset into data base.
        doc.owner = req.user.id;
        new this.model(doc).save((err, asset) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            // fs.rmdirSync(tmpDirPath);
            res.status(HttpStatus.OK).json({ id : asset.id });
        });
    }

    protected read = (req: Request, res: Response): void => {

        let id: string = req.query.id;

        this.model.findById(id).where('exchange').equals(null).exec((err, doc) => {

            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            res.status(HttpStatus.OK).json(doc);
        });
    }

    protected update = (req: Request, res: Response): void => {

        const doc: IAssetDocument = req.body;

        this.model.findById(doc.id).populate('owner').exec((findErr, asset: IAssetDocument) => {

            if (findErr) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            // If an resource not exist or is excluded, it responds as not found.
            if (!asset || asset.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            // If a user is not the owner of the resource, it forbids update.
            if (asset.owner.id !== req.user.id) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            // Exclude removed image filenames
            for (const filename of asset.imgs) {

                // if the filename stored on database exist in updates, it has not removed.
                if (doc.imgs.indexOf(filename) > -1)
                    continue;

                const filePath = path.join(Config.uploadPath, filename);

                if (!fs.existsSync(filePath)) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                fs.unlink(filePath, (unlinkErr) => {});
            }

            // verify if image files exist in temporary directory and move to production directory.
            for (const filename of doc.imgs) {

                // if the filename in updates exist in database, it is not a new image.
                if (asset.imgs.indexOf(filename) > -1)
                    continue;

                const sourceFilePath = path.join(Config.uploadPath, req.user.id , filename);
                const destFilePath = path.join(Config.uploadPath, filename);

                if (!fs.existsSync(sourceFilePath)) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                const source = fs.createReadStream(sourceFilePath);
                const dest = fs.createWriteStream(destFilePath);
                source.pipe(dest);
                source.on('error', (err) => console.log(err));
            }

            // Prevents owner change
            doc.owner = asset.owner;
            asset.set(doc);

            asset.save((saveErr, updatedAsset) => {

                if (saveErr) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                res.status(HttpStatus.OK).json();
            });
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
