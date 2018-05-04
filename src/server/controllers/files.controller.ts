import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus from 'http-status-codes';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime';
import * as crypto from 'crypto';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { Config } from '../config';

export class FileController extends BaseController {

    constructor() {
        super();
        this.config();
    }

    public create = (req: any, res: Response): void => {

        const uploadPath = path.join(Config.uploadPath, req.user.id);

        const upload = multer({ storage: multer.diskStorage({
                destination: uploadPath,
                filename: (request, file, cb) => {
                    let extension = path.extname(file.originalname);
                    extension = extension.length > 1 ? extension : '.' + mime.getExtension(file.mimetype);
                    crypto.pseudoRandomBytes(16, function(err, raw) {
                            cb(err, err ? undefined : raw.toString('hex') + extension);
                    });
                }
            })
        }).single('img');

        upload(req, res, (err) => {
            res.status(HttpStatus.OK).json({ filename: req.file.filename });
        });
    }

    public read = (req: any, res: Response): void => {

        const filePath = path.join(Config.uploadPath, req.query.filename);
        const mimeType = mime.getType(filePath);
        res.setHeader('Content-type', mimeType);

        res.download(path.join(Config.uploadPath, req.query.filename), req.query.filename);
    }

    public delete = (req: any, res: Response): void => {

        const filePath = path.join(Config.uploadPath, req.query.filename);

        fs.access(filePath, fs.constants.W_OK, (err) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            fs.unlink(filePath, (error) => {

                if (error) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                res.status(HttpStatus.OK).json();
            });
        });
    }

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), this.create);
        this.router.get(Routes.root, this.read);
        this.router.delete(Routes.root, Passport.authorize('jwt', this.authOptions), this.delete);
    }
}
