import { Request, Response, NextFunction } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';
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

        let query = { owner: req.user.id, deletedAt: null };
        let pageNumber: number = +req.query.page;
        let paginateInfo = { select: 'id name description price imgs createdAt', page: pageNumber, limit: 15, sort: { createdAt: -1 } };

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

        let paginateInfo = { select: 'id name description price imgs createdAt', page: pageNumber, limit: 15, sort: { createdAt: -1 } };

        AssetModel.paginate(query, paginateInfo, (err, result) => {

            if (err)
                res.status(HttpStatus.FORBIDDEN).json();

            res.status(HttpStatus.OK).json(result);
        });
    }

    protected create = (req: Request, res: Response, next: NextFunction): void => {

        let doc: IAssetDocument = req.body;

        if (doc.imgs.length === 0) {
            res.status(HttpStatus.FORBIDDEN).json();
            return;
        }

        // verify if image files exist in temporary directory and move to production directory.
        let tmpDirPath = path.join(Config.uploadPath, req.user.id);

        for (let filename of doc.imgs) {

            let sourceFilePath = path.join(tmpDirPath, filename);
            let destFilePath = path.join(Config.uploadPath, filename);

            if (!fs.existsSync(sourceFilePath)) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            let source = fs.createReadStream(sourceFilePath);
            let dest = fs.createWriteStream(destFilePath);
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

    protected update = (req: Request, res: Response): void => {

        let doc: IAssetDocument = req.body;

        this.model.findById(doc.id, (findErr, asset: IAssetDocument) => {

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
            if (asset.owner !== req.user.id) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            // Exclude removed image filenames
            for (let filename of asset.imgs) {

                // if the filename stored on database exist in updates, it has not removed.
                if (doc.imgs.indexOf(filename) > -1)
                    continue;

                let filePath = path.join(Config.uploadPath, filename);

                if (!fs.existsSync(filePath)) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                fs.unlink(filePath, (unlinkErr) => {});
            }

            // verify if image files exist in temporary directory and move to production directory.
            for (let filename of doc.imgs) {

                // if the filename in updates exist in database, it is not a new image.
                if (asset.imgs.indexOf(filename) > -1)
                    continue;

                let sourceFilePath = path.join(Config.uploadPath, req.user.id , filename);
                let destFilePath = path.join(Config.uploadPath, filename);

                if (!fs.existsSync(sourceFilePath)) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                let source = fs.createReadStream(sourceFilePath);
                let dest = fs.createWriteStream(destFilePath);
                source.pipe(dest);
                source.on('error', (err) => console.log(err));
            }

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
